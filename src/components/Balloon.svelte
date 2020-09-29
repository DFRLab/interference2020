<script>
  // the single balloon implementation
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { width, height } from '../stores/dimensions';
  import { oneLineTrim } from 'common-tags';
  import { bloomDuration, growDuration, jitterFactor } from '../transitions/constants';
  import { usaRed } from '../utils/colors';
  import { sortConsistently } from '../utils/misc';
  import { createEventDispatcher } from 'svelte';

  import EventTooltip from './EventTooltip.svelte';

  export let timePoint;
  export let selected = false;

  const dispatch = createEventDispatcher();

  function handleMouseOver(e) {
    if (e.buttons === 1) return;
    dispatch('mouseover', {id: timePoint.id, tp: timePoint, e})
  }

  function handleMouseClick(e) {
    dispatch('click', {id: timePoint.id, tp: timePoint, e})
  }
</script>

<g class="balloon"
   class:selected
   transform="translate({timePoint.x} {timePoint.fy})"
   on:mouseover|stopPropagation={handleMouseOver}
   on:click|stopPropagation={handleMouseClick}
   in:fade|local={{duration: bloomDuration, delay: growDuration + timePoint.id * jitterFactor}}
   out:fade|local={{duration: bloomDuration, delay: timePoint.id * jitterFactor}}>
  {#if (timePoint.recentlyAdded)}
    <circle class="glow"
            cx="0"
            cy="0"
            r={timePoint.rSmiTot * 0.95}></circle>
  {/if}
  <circle class="balloon-main"
          cx="0"
          cy="0"
          r={timePoint.rSmiTot}
          fill={timePoint.color}></circle>
  <circle class="balloon-effect"
          class:smi-pending={timePoint.smiPending}
          cx="0"
          cy="0"
          r={timePoint.rSmiTot}></circle>
</g>

<style>
  circle {
    stroke: none;
    opacity: 1;
  }

  .balloon {
    cursor: pointer;
  }

  .glow {
    stroke: var(--usa-lightred);
    stroke-width: 0.05rem;
    fill: none;
    animation: pulse 3s infinite ease-in-out;
    animation-iteration-count: 20;
    opacity: 0;
    pointer-events: none;
  }

  .balloon-effect {
    fill: url('#radial-gradient');
  }

  .balloon-effect.smi-pending {
    stroke: var(--usa-lightblue);
    stroke-width: 0.18rem;
    stroke-linecap: round;
    stroke-dasharray: 3px 5px;
  }

  .selected .balloon-effect {
    stroke: var(--usa-blue);
    stroke-width: 0.18rem;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.5);
      opacity: 0.9;
    }
    50% {
      opacity: 0.8;
    }
    70% {
      opacity: 0.09;
    }
    100% {
      transform: scale(3);
      opacity: 0;
    }
  }
</style>
