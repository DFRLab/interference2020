<script>
  // tooltip for the country centroids
  import { fade } from 'svelte/transition';
  import { width } from '../stores/dimensions';
  import { tooltip } from '../stores/centroidSelections';
  import { timeScale } from '../stores/scales';
  import { sortConsistently } from '../utils/misc';
  import { originalTimeDomain } from '../stores/filters';
  import {
    disinformantNationFilter,
    platformFilter,
    methodFilter,
    sourceCategoryFilter,
    selectAllFilters
  } from '../stores/filters';
  import { timeFormat, group } from 'd3';
  import { uniq } from 'lodash';

  import CaseDensity from './CaseDensity.svelte';

  const offset = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  };
  const contentOffset = 100;

  const tf = timeFormat('%B %d, %Y');

  let tWidth = 0;
  let tHeight = 0;
  let side;
  let left, top, contentTop;

  let platforms, methods, sourceCategories;

  $: if ($tooltip) {
    side = $width - $tooltip.c[0].xCountry < $width / 2 ? 'left' : 'right';
    
    top = $tooltip.c[0].yCountry - offset.top;

    contentTop = contentOffset - $tooltip.e.pageY + window.pageYOffset;
    if (Math.abs(contentTop) > tHeight - offset.bottom) {
      contentTop = -tHeight - offset.bottom;
    }
    
    if (side === 'left') {
      left = $tooltip.c[0].xCountry - tWidth - 2 * offset.left;
    } else if (side === 'right') {   
      left = $tooltip.c[0].xCountry - offset.left;
    }
  }

  function handleLiClick(type, item) {
    selectAllFilters();
    disinformantNationFilter.selectOne($tooltip.c[0].disNation);
    switch (type) {
      case 'platform': platformFilter.selectOne(item); break;
      case 'method': methodFilter.selectOne(item); break;
      case 'source': sourceFilter.selectOne(item); break;
      case 'sourceCategory': sourceCategoryFilter.selectOne(item); break;
    }
  }

  function generateItemsArray(data, name) {
    return [...group(data.map((d) => d[name]).flat(), (d) => d)]
              .map((d, i) => ({id: i, name: d[0], count: d[1].length}))
              .sort((a, b) => sortConsistently(a, b, 'count', 'id'));
  }

  $: if ($tooltip) {
    platforms = generateItemsArray($tooltip.c, 'platforms');
    methods = generateItemsArray($tooltip.c, 'methods');
    sourceCategories = generateItemsArray($tooltip.c, 'sourceCategory');
  }
</script>

{#if ($tooltip)}
  <div class="tooltip"
       style="left: {left}px; top: {top}px;"
       bind:clientWidth={tWidth}
       on:click|stopPropagation
       on:mouseover|stopPropagation
       transition:fade={{duration: 200}}>
    <div class="content"
         bind:clientHeight={tHeight}
         style="top: {contentTop}px;">
      <div class="scroll-wrapper">
        <div class="title">
          <h2>{uniq($tooltip.c.map((d) => d.disNation)).join(' | ')}</h2>
          <p class="small no-break">{$tooltip.c.length} case{$tooltip.c.length !== 1 ? 's': ''}</p>
        </div>
        {#if ($tooltip.c.length > 5 && !$originalTimeDomain)}
          <div class="case-density-vs-time">
            <h3>Attributions over time</h3>
            <CaseDensity width={Math.max(0, tWidth - offset.left - offset.right - 2 * 16)} 
                         height={50}
                         dates={$tooltip.c.map((d) => d.attributionDate)}
                         minDate={$timeScale.domain()[0]}
                         maxDate={new Date()} />
          </div>
        {/if}
        <div class="platforms-used">
          <h3>Platforms used</h3>
          <ul>
            {#each platforms as platform (platform.id)}
              <li on:click|stopPropagation={() => handleLiClick('platform', platform.name)}>
                {platform.name}
                <span class="very-small">({platform.count})</span>
              </li>
            {/each}
          </ul>
        </div>
        <div class="methods-applied">
          <h3>Methods applied</h3>
          <ul>
            {#each methods as method (method.id)}
              <li on:click|stopPropagation={() => handleLiClick('method', method.name)}>
                {method.name}
                <span class="very-small">({method.count})</span>
              </li>
            {/each}
          </ul>
        </div>
        <div class="source-categories">
          <h3>Source categor{sourceCategories.length !== 1 ? 'ies' : 'y'}</h3>
          <ul>
            {#each sourceCategories as sourceCategory (sourceCategory.id)}
              <li on:click|stopPropagation={() => handleLiClick('sourceCategory', sourceCategory.name)}>
                {sourceCategory.name}
                <span class="very-small">({sourceCategory.count})</span>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .tooltip {
    width: 21%;
    min-width: 100px;
    font-family: var(--font-02);
    position: absolute;
    z-index: 10000;
  }

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 60vh;
    margin: 16px;
    color: var(--text-black);
    background-color: var(--bg);
    box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.07), 
                0 4px 8px rgba(0,0,0,0.07), 
                0 8px 16px rgba(0,0,0,0.07),
                0 16px 32px rgba(0,0,0,0.07), 
                0 32px 64px rgba(0,0,0,0.07);
    position: absolute;
  }

  .scroll-wrapper {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .scroll-wrapper .title {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-image: linear-gradient(var(--usa-lightlightblue), var(--usa-lightblue));
  }

  .scroll-wrapper > div {
    width: 100%;
    padding: 0.5rem 1rem;
  }

  h2, h3 {
    color: var(--text-black);
  }

  h2 {
    font-family: var(--font-01);
    font-size: 1.1rem;
    font-weight: bold;
  }

  h3 {
    margin: 0 0 0.1rem 0;
    font-size: 0.9rem;
    font-weight: normal;
    clear: both;
  }

  p {
    display: inline;
    font-size: 0.8rem;
    line-height: 1.5;
  }

  ul {
    display: inline-block;
    list-style-type: none;
  }

  li {
    float: left;
    margin: 0.1rem 0.2rem 0.1rem 0;
    padding: 0.1rem 0.3rem;
    font-size: 0.7rem;
    color: var(--text-black);
    border: none;
    border-radius: 0.2rem;
    background-color: var(--usa-lightlightblue);
    cursor: pointer;
    user-select: none;
    transition: background-color 200ms ease;
    box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.07);
  }

  li:hover {
    background-color: var(--usa-lightblue);
  }

  .small {
    font-size: 0.7rem;
    font-weight: normal;
  }

  .very-small {
    font-size: 0.6rem;
    font-weight: normal;
  }

  .no-break {
    word-break: keep-all;
    white-space: nowrap;
  }
</style>
