<script>
  // selected dates on the timeline (= the spots)
  import { onMount } from 'svelte';
  import { panelHeight } from '../stores/dimensions';
  import loadSpots from '../utils/loadSpots';

  import TimelineSpot from './TimelineSpot.svelte';

  let spots = [];

  onMount(async () => {
    spots = await loadSpots();
  });
</script>

<g class="timeline-spots" transform="translate(0 {$panelHeight})">
  <g class="spots">
    {#each spots as spot (spot.id)}
      <TimelineSpot {spot} />
    {/each}
  </g>
</g>

<style>
</style>
