<script>
  // an event (= balloon + shiny circle)
  import ShinyCircle from './ShinyCircle.svelte';
  import Balloon from './Balloon.svelte';

  export let timePoint;
  export let selected = false;
  export let hovered = false;
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
