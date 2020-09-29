<script>
  // the root component
  import Catch from './Catch.svelte';
  import Visualization from './components/Visualization.svelte';
  import CookieBanner from './CookieBanner.svelte';

  let width;

  console.log('🎉 Fantastic! You are interested in our source code! Check it out – uncompiled: https://github.com/DFRLab/interference2020');
</script>

<div class="app-wrapper" bind:clientWidth={width}>
  <CookieBanner />
  {#if (width < 600)}
    <Catch content={'Please visit us on a larger screen to explore the visualization.'} />
  {:else if (/MSIE|Trident/.test(window.navigator.userAgent))}
    <Catch content={'Please visit us with a modern browser.'} />
  {:else}
    <Visualization />
  {/if}
</div>

<style>
  .app-wrapper {
    width: 100%;
    margin: 0;
    padding: 0.3rem 0;
  }
</style>
