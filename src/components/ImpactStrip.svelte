<script>
  import { format } from 'd3';

  import PolarizationStrip from './PolarizationStrip.svelte';

  export let value = 0;
  export let polarization;
  export let label = '';

  const commaFormat = format(',');

  let valueWidth = 0;
</script>

<li>
  <div class="smi-score {label.toLowerCase()}"
        bind:clientWidth={valueWidth}>
    {commaFormat(value)}
  </div>
  <span class="smi-label">
    {label}
  </span>
  {#if (polarization && (polarization.fulfills10Articles || polarization.fulfills25Percent) && value > 0)}
    <PolarizationStrip polarization={polarization[label.toLowerCase()]}
                       smi={value}
                       valueWidth={valueWidth} />
  {/if}
</li>

<style>
  li {
    margin: 0.2rem 0.3rem 0.2rem 0;
    font-size: 0.8rem;
    min-width: 30%;
  }

  .smi-score {
    display: inline-block;
    padding: 0 0.2rem;
    border: none;
    border-radius: 3px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 
                0 2px 4px rgba(0, 0, 0, 0.07);
  }

  .smi-label {
    display: inline-block;
    padding: 0 0.1rem;
    border: none;
    border-radius: 3px;
  }
</style>
