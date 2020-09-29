<script>
  // shiny circle around balloons
  import { fade } from 'svelte/transition';
  import { bloomDuration, growDuration, jitterFactor } from '../transitions/constants';
  import { sortConsistently } from '../utils/misc';

  export let timePoint;
  export let selected = false;
  export let hovered = false;

  let sortedRadii = [];

  $: if (timePoint) sortedRadii = [
    {
      id: 2,
      className: 'reddit',
      r: timePoint.rSmiReShare + timePoint.rSmiTwShare + timePoint.rSmiFbShare,
    },
    {
      id: 1,
      className: 'twitter',
      r: timePoint.rSmiTwShare + timePoint.rSmiFbShare,
    },
    {
      id: 0,
      className: 'facebook',
      r: timePoint.rSmiFbShare,
    }
  ]
  .map((d) => ({...d, r: d.r * sizeFactor}));

  $: sizeFactor = timePoint.rSmiTot / 100;
</script>

<g class="shiny-circle"
   class:selected={selected || hovered}
   transform="translate({timePoint.x} {timePoint.fy})"
   in:fade|local={{duration: bloomDuration, delay: growDuration + timePoint.id * jitterFactor}}
   out:fade|local={{duration: bloomDuration, delay: timePoint.id * jitterFactor}}>
  {#each sortedRadii as {id, className, r} (id)}
    <circle class={className}
            cx="0"
            cy="0"
            r={r + timePoint.rSmiTot} />
  {/each}
</g>

<style>
  g {
    opacity: 0.04;
    transition: opacity 400ms ease;
    pointer-events: none;
  }

  g.selected {
    opacity: 0.76;
  }

  circle {
    stroke: none;
    opacity: 1;
  }
</style>
