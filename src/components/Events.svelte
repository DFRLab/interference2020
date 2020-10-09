<script>
  // setting up all events
  import Event from './Event.svelte';
  import { hovered, selected } from '../stores/eventSelections';
  import { tweened } from 'svelte/motion';

  export let timePoints = [];

  function handleEventMouseover(event) {
    $hovered = event.detail;
  }

  function handleEventClick(event) {
    const obj = event.detail;
    if ($selected.map((d) => d.id).includes(obj.id)) {
      selected.remove(obj);
    } else {
      selected.add(obj);
    }
  }
</script>

<g class="events">
  {#each timePoints as timePoint (timePoint.id)}
    <Event {timePoint}
           selected={$selected && $selected.map((d) => d.id).includes(timePoint.id)}
           hovered={$hovered && $hovered.id === timePoint.id}
           on:click={handleEventClick}
           on:mouseover={handleEventMouseover} />
  {/each}
</g>

<style>
  .events {
    width: 100%;
    height: 50%;
    overflow: hidden;
  }
</style>
