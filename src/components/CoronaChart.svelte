<script>
  // chart with COVID-19 cases in the U.S.
  import { timeScale } from '../stores/scales';
  import { panelHeight } from '../stores/dimensions';
  import { fade } from 'svelte/transition';
  import {
    scaleLog,
    max,
    area as d3area,
    format } from 'd3';

  export let data;
  export let margin = {
    top: 100,
    right: 20,
    bottom: 0,
    left: 20
  };
  export let showLegend = true;

  const commaFormat = format(',');

  let xScale, yScale, area, lastItem, ticks;
  let casesPath, deathsPath;

  $: if (data) {
    yScale = scaleLog()
      .domain([1, max(data, (d) => d.cases)])
      .range([$panelHeight - margin.bottom, margin.top * 0.7]);

    area = (type, data) => d3area()
              .x((d) => $timeScale(d.date))
              .y0(yScale(1))
              .y1((d) => yScale(d[type]))(data);
    
    casesPath = area('cases', data);
    deathsPath = area('deaths', data.filter((d) => d.deaths > 0));

    lastItem = data.slice(-1)[0];

    ticks = yScale.ticks(5).slice(1);
  }
</script>

{#if (data)}
  <g class="corona-chart"
     transition:fade={{duration: 200}}>
    <g class="areas">
      <path class="cases"
            d={casesPath}></path>
      <path class="deaths"
            d={deathsPath}></path>
    </g>
    {#if (showLegend)}
      <g class="legend legend-cases"
          transform="translate({$timeScale(lastItem.date)} {yScale(lastItem.cases) + 1})">
        <path d="M0 0L10 0L10 -50"></path>
        <text transform="translate(15 -40)">
          {commaFormat(lastItem.cases)} cases
        </text>
      </g>
      <g class="legend legend-deaths"
          transform="translate({$timeScale(lastItem.date)} {yScale(lastItem.deaths) + 1})">
        <path d="M0 0L20 0L20 {yScale(lastItem.cases) - yScale(lastItem.deaths) - 20}"></path>
        <text transform="translate(25 {yScale(lastItem.cases) - yScale(lastItem.deaths) - 10})">
          {commaFormat(lastItem.deaths)} deaths
        </text>
      </g>
      <g class="ticks"
        transform="translate({$timeScale(lastItem.date) + 5} 0)">
        {#each ticks as tick}
          <g class="tick"
            transform="translate(0 {yScale(tick)})">
            <rect x="0" y="-12" width="25" height="15"></rect>
            <text>{commaFormat(tick)}</text>
          </g>
        {/each}
      </g>
    {/if}
  </g>
{/if}

<style>
  path {
    stroke: none;
    opacity: 0.2;
  }

  path.cases {
    fill: var(--usa-lightblue);
  }

  path.deaths {
    fill: var(--usa-blue);
  }

  .legend path {
    stroke-width: 1px;
    opacity: 0.6;
    stroke-linecap: round;
    fill: none;
  }

  .legend-cases path {
    stroke: var(--usa-lightblue);
  }

  .legend-deaths path {
    stroke: var(--usa-blue);
  }

  .legend text {
    font-family: var(--font-02);
    font-size: 0.7rem;
    fill: var(--dfrlab-gray);
  }

  .tick rect {
    fill: var(--bg);
    stroke: none;
  }

  .tick text {
    font-family: var(--font-02);
    font-size: 0.6rem;
    fill: var(--dfrlab-silver);
  }
</style>
