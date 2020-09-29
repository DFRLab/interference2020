<script>
  // the timeline
  import { oneLineTrim } from 'common-tags';
  import { width, maxDim, panelHeight } from '../stores/dimensions';
  import { gentleLine } from '../utils/paths';

  import TimelineSpots from './TimelineSpots.svelte';

  const xOffset = $width / 70;
  const yOffset = $maxDim / 900;
</script>

<g class="timeline" transform="translate(0 {$panelHeight})">
  <path d={gentleLine($width, xOffset, yOffset)}></path>
</g>
<TimelineSpots />

<style>
  path {
    stroke: none;
    fill: url(#timeline-gradient);
    fill-opacity: 1;
  }
</style>
