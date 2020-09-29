<script>
  // single implementation of a country centroid on the map
  import { centroidScale } from '../stores/scales';
  import { growDuration } from '../transitions/constants';
  import { haveOverlap } from '../utils/misc';
  import { createEventDispatcher } from 'svelte';
  
  export let centroid;
  export let country;
  export let selected = false;

  const dispatch = createEventDispatcher();
</script>

<g class="centroid"
   class:selected
   on:click|stopPropagation={(e) => dispatch('click', {id: country, c: centroid, e})}
   on:mouseover|stopPropagation={(e) => dispatch('mouseover', {id: country, c: centroid, e})}>
  <circle class="centroid-fg"
          style="transition: stroke-opacity {growDuration}ms ease;"
          cx={centroid[0].xCountry}
          cy={centroid[0].yCountry}
          r={$centroidScale(centroid.length)}></circle>
  {#if (centroid.length > 5)}
    <g class="centroid-label" transform="translate({centroid[0].xCountry} {centroid[0].yCountry + 5})">
      <text style="transition: opacity {growDuration}ms ease;">{centroid.filter((c) => c.show).length}</text>
    </g>
  {/if}
</g>

<style>
  .centroid {
    cursor: pointer;
  }

  .centroid-fg {
    stroke: var(--usa-blue);
    stroke-width: 0.18rem;
    stroke-opacity: 0.2;
    fill: var(--bg);
  }

  .selected .centroid-fg {
    stroke-opacity: 1;
  }

  .centroid-label text {
    font-family: var(--font-02);
    font-size: 0.7rem;
    font-weight: bold;
    text-anchor: middle;
    fill: var(--usa-blue);
    opacity: 0.2;
    pointer-events: none;
  }

  .selected .centroid-label text {
    opacity: 1;
  }
</style>
