<script>
  // selected dates on the timeline (= the spots)
  import { onMount } from 'svelte';
  import { timeScale } from '../stores/scales';
  import { maxDim, panelHeight } from '../stores/dimensions';
  import loadSpots from '../utils/loadSpots';
  import { spottooltipable } from '../actions/spottooltipable';
  import { drawWrapper } from '../stores/elements';

  let spots = [];

  onMount(async () => {
    spots = await loadSpots();
  });
</script>

<g class="timeline-spots" transform="translate(0 {$panelHeight})">
  <g class="spots">
    {#each spots as spot (spot.id)}
      <g class="spot"
         transform="translate({$timeScale(spot.date)} 0)"
         use:spottooltipable={{data: spot, target: drawWrapper, left: $timeScale(spot.date), top: $panelHeight + 20}}>
        <circle cx="0" cy="0" r="5"></circle>
        <circle class="bait" cx="0" cy="0" r="10"></circle>
      </g>
    {/each}
  </g>
</g>

<style>
  g.spot {
    pointer-events: all;
    cursor: pointer;
  }

  g.spot:hover circle:not(.bait) {
    fill: var(--dfrlab-gray);
  }

  circle {
    stroke: var(--dfrlab-gray);
    stroke-width: 0.13rem;
    stroke-opacity: 0.9;
    fill: var(--bg);
    transition: all 200ms ease;
  }

  circle.bait {
    fill: none;
    stroke: none;
  }
</style>
