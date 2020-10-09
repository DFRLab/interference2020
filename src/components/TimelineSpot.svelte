<script>
  // selected dates on the timeline (= the spots)
  import { panelHeight } from '../stores/dimensions';
  import { timeScale } from '../stores/scales';
  import { spottooltipable } from '../actions/spottooltipable';
  import { drawWrapper } from '../stores/elements';
  import { createTweenedPos } from '../transitions/tween';

  export let spot;

  const x = createTweenedPos();

  $: $x = $timeScale(spot.date);
</script>

<g class="spot"
    transform="translate({$x} 0)"
    use:spottooltipable={{data: spot, target: drawWrapper, left: $x, top: $panelHeight + 20}}>
  <circle cx="0" cy="0" r="5"></circle>
  <circle class="bait" cx="0" cy="0" r="10"></circle>
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
