<script>
  // the case density plot for the country tooltips
  import {
    scaleLinear,
    extent,
    line as d3line,
    curveBasis } from 'd3';
  import { kernelDensityEstimator, kernelEpanechnikov } from '../utils/misc';

  export let width = 0;
  export let height = 0;
  export let dates = [];
  export let minDate = new Date();
  export let maxDate = new Date();

  const margin = {
    top: 10,
    right: 6,
    bottom: 10,
    left: 6
  };

  const line = d3line().curve(curveBasis);

  $: ms = dates.map((d) => d.getTime() - minDate.getTime());

  $: xScale = scaleLinear()
      .domain([0, maxDate.getTime() - minDate.getTime()])
      .range([margin.left, width - margin.right]);

  $: kde = kernelDensityEstimator(kernelEpanechnikov(Math.max(...ms) / ms.length), xScale.ticks(ms.length))
  $: density = kde(ms);

  $: yScale = scaleLinear()
      .domain(extent(density.map((d) => d[1])))
      .range([height - margin.bottom, margin.top]);

  $: data = density.map((d) => [xScale(d[0]), yScale(d[1])]);
</script>

<svg viewBox="0 0 {width} {height}"
     width={width}
     height={height}>
  <defs>
    <linearGradient id="density-gradient" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" style="stop-color: var(--usa-lightlightblue);" />
      <stop offset="0.8" style="stop-color: var(--usa-lightblue);" />
      <stop offset="1" style="stop-color: var(--usa-lightblue);" />
    </linearGradient>
  </defs>
  <g class="line">
    <path d={line(data)}></path>
    <circle cx={data[data.length - 1][0]} cy={data[data.length - 1][1]} r="5" />
  </g>
</svg>

<style>
  .line path {
    stroke: url(#density-gradient);
    stroke-opacity: 1;
    stroke-width: 0.15rem;
    stroke-linecap: round;
    fill: none;
  }

  circle {
    stroke: none;
    fill: var(--usa-blue);
  }
</style>
