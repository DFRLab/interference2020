<script>
  // loads data for context datasets and holds the individual graphing components
  import { onMount } from 'svelte';
  import { contextData, originalTimeDomain } from '../stores/filters';
  import { margin } from '../stores/dimensions';

  import CoronaChart from './CoronaChart.svelte';
</script>

<g class="background-chart">
  {#each $contextData.filter((d) => d.selected) as dataset}
    {#if (dataset.id === 'corona')}
      <CoronaChart data={dataset.data}
                   margin={$margin}
                   showLegend={!$originalTimeDomain} />
    {/if}
  {/each}
</g>

<style>
</style>
