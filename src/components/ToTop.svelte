<script>
  // back to top or to viz buttons
  import { fly } from 'svelte/transition';
  import { scrollTo } from '../utils/misc';

  let show = false;

  function handleScroll() {
    if (window.pageYOffset > window.innerHeight) {
      show = true;
    } else {
      show = false;
    }
  }

  function handleSpanClick(id) {
    scrollTo(id);
  }
</script>

<svelte:window on:scroll={handleScroll}></svelte:window>

{#if (show)}
  <div class="to-top" transition:fly={{duration: 400, y: 100}}>
    <span class="pseudolink" on:click={() => handleSpanClick('top')}>To Top</span>
    <span class="pseudolink" on:click={() => handleSpanClick('viz')}>To Visualization</span>
  </div>
{/if}

<style>
  .to-top {
    padding: 0.7rem;
    font-family: var(--font-02);
    font-size: 0.9rem;
    background-color: var(--transparentbg);
    border-top: 2px solid var(--usa-lightblue);
    border-left: 2px solid var(--usa-lightblue);
    border-right: 2px solid var(--usa-lightblue);
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    position: fixed;
    z-index: 1000001;
    bottom: 0;
    right: 1rem;
  }

  span {
    display: block;
    margin: 0.2rem auto;
    text-align: center;
  }
</style>
