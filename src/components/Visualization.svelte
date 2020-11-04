<script>
  // the visualization wrapper
  // also holds the logic for the force-directed graph simulation
  // also holds filter=>event logic
  // also holds base data loading logic
  import { onMount } from 'svelte';
  import loadData from '../utils/loadData';
  import loadMapData from '../utils/loadMapData';
  import loadCoronaData from '../utils/loadCoronaData';
  import loadGoogleTrendsData from '../utils/loadGoogleTrendsData';
  import { setScales } from '../utils/scales';
  import {
    width,
    height,
    panelHeight,
    minDim,
    maxDim,
    margin,
    controlsHeight } from '../stores/dimensions';
  import {
    timeScale,
    smiTotalYScale,
    smiTotalRScale,
    smiShareRScale,
    attributionScoreScale } from '../stores/scales';
  import {
    disinformantNationFilter,
    platformFilter,
    methodFilter,
    sourceFilter,
    sourceCategoryFilter,
    attributionScoreFilter,
    attributionScoreDef,
    textSearchFilter,
    originalTimeDomain,
    contextData,
    caseIdFilter,
    tagFilter } from '../stores/filters';
  import { haveOverlap, withinRange, includesTextSearch, isCaseId, preloadImages } from '../utils/misc';
  import { selected } from '../stores/eventSelections';
  import { drawWrapper } from '../stores/elements';
  
  import { uniq } from 'lodash';
  import {
    extent,
    forceSimulation,
    forceX,
    forceY,
    forceManyBody,
    forceCenter,
    forceCollide,
    timeFormat } from 'd3';
  import { sortConsistently } from '../utils/misc';
  import { parseUrl } from '../utils/share';

  import ToTop from './ToTop.svelte';
  import TopVisualContent from './TopVisualContent.svelte';
  import LoadingInfo from './LoadingInfo.svelte';
  import Controls from './Controls.svelte';
  import Svg from './Svg.svelte';
  import Canvas from './Canvas.svelte';
  import Info from './Info.svelte';
  import EventTooltip from './EventTooltip.svelte';
  import CentroidTooltip from './CentroidTooltip.svelte';
  import CreatedBy from './CreatedBy.svelte';
  import Table from './Table.svelte';

  const tf = timeFormat('%B %d, %Y');
  const observeDays = 3;

  let data, timePoints;

  onMount(async () => {
    // load the dataset and add runtime variables
    data = (await loadData())
            .map((d) => ({
              ...d,
              recentlyAdded: Math.ceil(((new Date()) - d.timestamp) / (1000 * 60 * 60 * 24)) <= observeDays,
              search: [d.shortTitle, d.shortDescription, d.platforms, d.methods, d.sourceNation, d.source, d.sourceCategory].flat().join('__').toLowerCase(),
              show: false
            }));

    // load the map data
    loadMapData();

    // setup filters
    disinformantNationFilter.init(data, 'disinformantNation');
    platformFilter.init(data, 'platforms');
    methodFilter.init(data, 'methods');
    sourceFilter.init(data, 'sourceFilter');
    sourceCategoryFilter.init(data, 'sourceCategory');
    tagFilter.init(data, 'tags');
    $attributionScoreFilter = attributionScoreDef;
    
    // get context datasets
    $contextData = [
      {
        id: 'corona',
        name: 'COVID-19 in the US',
        source: 'The New York Times',
        data: await loadCoronaData(),
        selected: false
      },
      {
        id: 'gt_voter_fraud',
        name: '"Voter Fraud" search',
        source: 'Google Trends',
        data: await loadGoogleTrendsData('voter fraud'),
        selected: false
      },
      {
        id: 'gt_disinformation',
        name: '"Disinformation" search',
        source: 'Google Trends',
        data: await loadGoogleTrendsData('disinformation'),
        selected: false
      }
    ]
    .filter((d) => d.data.length > 0);

    preloadImages(data);

    // apply filters from URL
    if (window.location.hash.length > 1) {
      const urlFilters = parseUrl(window.location.hash);

      disinformantNationFilter.applyBoolArray(urlFilters.disinformantNations);
      platformFilter.applyBoolArray(urlFilters.platforms);
      methodFilter.applyBoolArray(urlFilters.methods);
      sourceFilter.applyBoolArray(urlFilters.sources);
      sourceCategoryFilter.applyBoolArray(urlFilters.sourceCategories);
      tagFilter.applyBoolArray(urlFilters.tags);
      contextData.applyBoolArray(urlFilters.contextData);
      $attributionScoreFilter = urlFilters.attributionScores;
      $textSearchFilter = urlFilters.textSearch;
      $caseIdFilter = urlFilters.caseId;
    } 
  });

  // set the scales
  $: setScales(data, $width, $minDim, $maxDim, $panelHeight, $margin);

  $: if (data) {
    // calculate scaled data points
    const scaledData = data.map((d) => ({
      ...d,
      _x: $timeScale(d.attributionDate),
      _y: $smiTotalYScale.range()[0],
      color: $attributionScoreScale(d.attributionScore),
      rSmiTot: isNaN(d.smiTotal) || d.smiTotal === 0 ? $smiTotalRScale.range()[0] : $smiTotalRScale(d.smiTotal),
      rSmiFb: isNaN(d.smiFacebook) || d.smiFacebook === 0 ? $smiTotalRScale.range()[0] : $smiTotalRScale(d.smiFacebook),
      rSmiTw: isNaN(d.smiTwitter) || d.smiTwitter === 0 ? $smiTotalRScale.range()[0] : $smiTotalRScale(d.smiTwitter),
      rSmiRe: isNaN(d.smiReddit) || d.smiReddit === 0 ? $smiTotalRScale.range()[0] : $smiTotalRScale(d.smiReddit),
      rSmiFbShare: $smiShareRScale(d.smiFacebookShare),
      rSmiTwShare: $smiShareRScale(d.smiTwitterShare),
      rSmiReShare: $smiShareRScale(d.smiRedditShare),
      fy: d.smiPending ? Math.min($smiTotalYScale.range()[0], $smiTotalYScale.range()[0] - 2 * $smiTotalRScale.range()[0] + (Math.random() - 0.5) * 20) : $smiTotalYScale(d.smiTotal),
      outOfTimeRange: $timeScale(d.attributionDate) < $timeScale.range()[0] || $timeScale(d.attributionDate) > $timeScale.range()[1]
    }))
    .sort((a, b) => sortConsistently(a, b, 'rSmiTot', 'id'));

    // for some rason these definitions need to be in here and not in a gobal scope or module
    const simulation = forceSimulation()
      .force('x', forceX().x(d => d._x));

    const simulationCharge = forceSimulation()
      .force('x', forceX().x(d => d._x))
      .force('charge', forceManyBody().strength((d) => -(d.rSmiTot + 1) * 10).distanceMax(500).distanceMin(50));

    simulation
      .nodes(scaledData)
      .alpha(0.8)
      .tick(300);

    // finally set the global timePoints variable
    simulationCharge
      .nodes(scaledData)
      .alpha(0.8)
      .tick(300)
      .on('end', () => {
        timePoints = scaledData.map((d) => ({
          ...d,
          x: $originalTimeDomain
              ? d.x 
              : Math.max(
                  $margin.left - Math.random() * $margin.left / 4, 
                  Math.min($width - $margin.right + (Math.random() + 2) * $margin.right / 4, d.x)
                )
        }));
    });
  }

  // translate filter values into show property state
  $: if (timePoints) {
      timePoints = timePoints.map((d) => ({
        ...d,
        show: haveOverlap($disinformantNationFilter, d.disinformantNation)
              && haveOverlap($platformFilter, d.platforms)
              && haveOverlap($methodFilter, d.methods)
              && haveOverlap($sourceFilter, d.sourceFilter)
              && haveOverlap($sourceCategoryFilter, d.sourceCategory)
              && haveOverlap($tagFilter, d.tags)
              && includesTextSearch($textSearchFilter, d.search)
              && withinRange($attributionScoreFilter, d.attributionScore)
              && isCaseId($caseIdFilter, d.id)
      }));
    }
</script>

<ToTop />
<TopVisualContent {data} />
<div id="viz" class="visualization-wrapper" bind:clientWidth={$width}>
  {#if (!timePoints)}
    <LoadingInfo />
  {/if}
  <div class="sticky-wrapper">
    <div class="controls-wrapper" bind:clientHeight={$controlsHeight}>
      <Controls {timePoints} />
    </div>
    <div class="draw-wrapper" bind:this={$drawWrapper} bind:clientHeight={$height}>
      {#if (timePoints)}
        <Svg {timePoints} />
        <Canvas />
        <Info selectedItems={$selected}
              x={2 * $timeScale.range()[0]}
              y={$smiTotalYScale.range()[1]} />
        <EventTooltip />
        <CentroidTooltip />
        <CreatedBy />
      {/if}
    </div>
  </div>
  <div class="table-wrapper">
    <Table {timePoints} />
  </div>
</div>

<style>
  .visualization-wrapper {
    width: 100%;
    position: relative;
  }

  .controls-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 0.5rem 0.5rem 0.5rem;
    position: relative;
    pointer-events: none;
  }

  .sticky-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 180vmin;
    min-height: 1200px;
    max-height: 80vmax;
    margin: 2rem 0 0 0;
    position: relative;
  }

  .draw-wrapper {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  @media (min-width: 1350px) {
    .controls-wrapper {
      position: sticky;
      top: 0px;
      z-index: 2000;
    }

    .draw-wrapper {
      position: absolute;
      top: 0;
      z-index: 0;
    } 
  }

  .table-wrapper {
    width: 100%;
    margin: 2rem 0;
    padding: 0.2rem 1rem;
  }
</style>
