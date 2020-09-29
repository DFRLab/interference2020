<script>
  // info shown on the timeline, e.g. for jumps to table view
  import { fade } from 'svelte/transition';

  export let selectedItems = [];
  export let x = 0;
  export let y = 0;

  let showCounter = 0;

  $: show = selectedItems.length >= 2;
  $: if (show) showCounter += 1;
</script>

{#if (show && showCounter <= 2)}
  <div class="info"
       style="left: {x}px; top: {y}px;"
       transition:fade>
    <div class="info-icon">i</div>
    <p>Compare your selection in the <span class="pseudolink" on:click|self={() => document.querySelector('#table').scrollIntoView({behavior: 'smooth'})}>dataset view</span>.</p>  
  </div>
{/if}

<style>
  .info {
    display: flex;
    align-items: center;
    position: absolute;
    z-index: 20000;
  }

  .info-icon {
    width: 1.2rem;
    height: 1.2rem;
    font-family: var(--font-02);
    font-size: 0.8rem;
    font-weight: bold;
    color: var(--usa-blue);
    text-align: center;
    border: 2px solid var(--usa-blue);
    border-radius: 50%;
  }

  p {
    margin-left: 0.4rem;
    font-family: var(--font-02);
    font-size: 0.8rem;
    color: var(--text-black);
  }
</style>
