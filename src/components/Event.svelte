<script>
  // an event (= balloon + shiny circle)
  import ShinyCircle from './ShinyCircle.svelte';
  import Balloon from './Balloon.svelte';

  import { tweened } from 'svelte/motion';

  export let timePoint;
  export let selected = false;
  export let hovered = false;

  const tweenedX = tweened(0, {
    delay: 0,
    duration: 750,
  });
</script>

{#if (timePoint.show)}
  <g class="event">
  export let hovered = false;
    <ShinyCircle {timePoint} {selected} {hovered} />
    <Balloon {timePoint} {selected} on:mouseover on:click/>
  </g>
{/if}

<style>
</style>
