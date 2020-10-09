<script>
  // an event (= balloon + shiny circle)
  import ShinyCircle from './ShinyCircle.svelte';
  import Balloon from './Balloon.svelte';
  import { createTweenedPos } from '../transitions/tween';

  export let timePoint;
  export let selected = false;
  export let hovered = false;

  const tweenedPos = createTweenedPos();

  $: $tweenedPos = {x: timePoint.x, fy: timePoint.fy};
</script>

{#if (timePoint.show)}
  <g class="event">
  export let hovered = false;
    <ShinyCircle {timePoint} tweenedPos={$tweenedPos} {selected} {hovered} />
    <Balloon {timePoint} tweenedPos={$tweenedPos} {selected} on:mouseover on:click/>
  </g>
{/if}

<style>
</style>
