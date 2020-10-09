<script>
  // tooltip of the timeline spots
  import { fade } from 'svelte/transition';
  import { timeFormat } from 'd3';

  export let data;
  export let x = 0;
  export let y = 0;

  const tf = timeFormat('%B %d, %Y');

  const maxWidth = 300;
  const margin = 10;

  let width = maxWidth;
  let left = 0;

  $: {
    if (x - width / 2 < 0) {
      left = margin;
    } else {
      left = x - width / 2;
    }

    if (x + width - document.body.offsetWidth > 0) {
      left = document.body.offsetWidth - width - margin;
    }
  }
</script>

<div class="spot-tooltip"
     bind:clientWidth={width}
     style="left: {left}px; top: {y}px; width: {maxWidth}px;"
     transition:fade={{duration: 200}}>
  <div class="content">
    <p class="date">
      {tf(data.date)}
    </p>
    <h2 class="name">
      {data.name}
    </h2>
    <p class=" description">
      {data.description}
    </p>
  </div>
</div>

<style>
  .spot-tooltip {
    margin-right: 1rem;
    position: absolute;
    z-index: 1000000000;
  }

  .content {
    width: 100%;
    height: 100%;
    padding: 1rem;
    font-family: var(--font-02);
    color: var(--text-black);
    background-color: var(--bg);
    box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.07), 
                0 4px 8px rgba(0,0,0,0.07), 
                0 8px 16px rgba(0,0,0,0.07),
                0 16px 32px rgba(0,0,0,0.07), 
                0 32px 64px rgba(0,0,0,0.07);
  }

  .date {
    font-size: 0.6rem;
  }

  h2 {
    margin: 0.2rem 0;
    font-size: 0.9rem;
  }

  .description {
    font-size: 0.8rem;
    line-height: 1.5;
  }
</style>
