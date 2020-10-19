<script>
  // chart with GoogleTrends data
  import { timeScale } from '../stores/scales';
  import { panelHeight } from '../stores/dimensions';
  import { fade } from 'svelte/transition';
  import {
    scaleLinear,
    max,
    area as d3area,
    format,
    curveBasis } from 'd3';

  export let data;
  export let margin = {
    top: 100,
    right: 20,
    bottom: 0,
    left: 20
  };
  export let showLegend = true;

  const commaFormat = format(',');

  let xScale, yScale, area, ticks;
  let casesPath, deathsPath;

  $: if (data) {
    yScale = scaleLinear()
      .domain([0, max(data, (d) => d.value)])
      .range([$panelHeight - margin.bottom, margin.top * 0.7]);

    area = d3area()
      .x((d) => $timeScale(d.date))
      .y0(yScale(0))
      .y1((d) => yScale(d.value))
      .curve(curveBasis);

    ticks = yScale.ticks(5).slice(1);
  }
</script>

{#if (data)}
  <g class="google-trends-chart"
     transition:fade={{duration: 200}}>
    <g class="area">
      <path d={area(data)}></path>
    </g>
    <!-- {#if (showLegend)}
      <g class="ticks"
        transform="translate({$timeScale(data.slice(-1)[0].date) + 5} 0)">
        {#each ticks as tick}
          <g class="tick"
            transform="translate(0 {yScale(tick)})">
            <rect x="0" y="-12" width="25" height="15"></rect>
            <text>{commaFormat(tick)}</text>
          </g>
        {/each}
      </g>
    {/if} -->
  </g>
{/if}

<style>
  path {
    stroke: none;
    opacity: 0.2;
    fill: var(--usa-blue);
  }

  /* .tick rect {
    fill: var(--bg);
    stroke: none;
  }

  .tick text {
    font-family: var(--font-02);
    font-size: 0.6rem;
    fill: var(--dfrlab-silver);
  } */
</style>
