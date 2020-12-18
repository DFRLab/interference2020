<script>
  // wrapper plotting centroids and source links
  import { panelHeight, width, mapHeight } from '../stores/dimensions';
  import { countries, geoPath } from '../stores/map';
  import { group } from 'd3';
  import { sortConsistently } from '../utils/misc';
  import { hovered as eHovered, selected as eSelected } from '../stores/eventSelections';
  import { hovered as cHovered } from '../stores/centroidSelections';
  import {
    disinformantNationFilter,
    selectAllFilters,
    unselectAllFilters,
    highlightPolarization } from '../stores/filters';

  import SourceLink from './SourceLink.svelte';
  import Centroid from './Centroid.svelte';

  export let timePoints;

  let disNationNumberLeft = 0;
  let disNationNumberRight = 0;

  function handleMapClick() {
    disinformantNationFilter.selectAll();
  }

  function handleBodyMouseover() {
    $cHovered = null
  }

  function handleCentroidClick(event) {
    const obj = event.detail;

    if ($disinformantNationFilter.filter((d) => d.selected).length === $disinformantNationFilter.length) {
      selectAllFilters();
      disinformantNationFilter.selectOne(obj.id);
    } else if ($disinformantNationFilter.filter((d) => d.selected).map((d) => d.id).includes(obj.id)) {
      selectAllFilters();
    } else {
      selectAllFilters();
      disinformantNationFilter.selectOne(obj.id);
    }
  }

  function handleCentroidMouseover(event) {
    $cHovered = event.detail;
  }

  $: countryNames = $countries.map((d) => d.properties.name);

  $: sources = timePoints.map((d) => (
    d.disinformantNation.map((disNation, i) => {
      let coords = [];
      let nativeCountry = false;
      if (countryNames.includes(disNation)) {
        coords = $geoPath.centroid($countries.find((country) => country.properties.name === disNation));
        if (disNation === 'United States of America') {
          coords = [$geoPath.centroid($countries.find((country) => country.properties.name === 'Mexico'))[0],
                    $geoPath.centroid($countries.find((country) => country.properties.name === 'Spain'))[1]];
        }
        nativeCountry = true;
      }
      return {
        ...d,
        idNation: [d.id, i].join(''),
        xCountry: coords[0],
        yCountry: coords[1] + $panelHeight,
        disNation: disNation,
        nativeCountry: nativeCountry
      };
    })))
    .flat()
    .sort((a, b) => sortConsistently(a, b, 'disNation', '_x'))
    .map((d, i , arr) => {
      let shift = 0;
      if (arr[i - 1] && arr[i - 1].disNation === d.disNation) {
        shift = d.xCountry < d._x ? disNationNumberRight += 1 : disNationNumberLeft -= 1;
      } else {
        disNationNumberRight = disNationNumberLeft = 0;
      }
      return {
        ...d,
        shift
      }
    })
    .map((d, _, arr) => {
      const minDisNationShift = Math.min(...arr.filter((a) => a.disNation === d.disNation).map((a) => a.shift));
      return {
        ...d,
        shift: d.shift <= 0 ? (-1 - (d.shift + Math.abs(minDisNationShift))) : d.shift
      };
    });

  $: centroids = [...group(sources.filter(s => s.nativeCountry), (s) => s.disNation)];
</script>

<svelte:body on:mouseover={handleBodyMouseover} />

<g class="centroids-sources">
  {#each sources as source (source.idNation)}
    <SourceLink {source} 
                selected={$eSelected && $eSelected.map((d) => d.id).includes(source.id)
                            ? 'selected'
                            : ($eSelected && $eSelected.length > 0
                                ? 'background'
                                : 'unselected')}
                hovered={$eHovered && $eHovered.id === source.id
                            ? 'selected'
                            : ($eHovered
                                ? 'background'
                                : 'unselected')}
                extraFaint={source.outOfTimeRange}
                showPolarizationColor={$highlightPolarization} />
  {/each}
  {#each centroids as [country, centroid]}
    <Centroid {centroid}
              {country}
              selected={$disinformantNationFilter.filter((d) => d.selected).map((d) => d.id).includes(country)}
              on:click={handleCentroidClick}
              on:mouseover={handleCentroidMouseover} />
  {/each}
</g>

<style>
</style>
