<script>
  import { categories } from '../inputs/polarization';

  import { scaleLinear, line as d3line, curveBasis } from 'd3';

  export let polarization;
  export let smi = 0;
  export let valueWidth = 0;

  const magnifierHeight = 20;

  const margin = {
    top: 4,
    right: 2,
    bottom: 0,
    left: 2
  };

  const yScale = scaleLinear()
    .domain([0, 1])
    .range([margin.top, magnifierHeight - margin.bottom]);

  const line = d3line()
    .x((d) => d[0])
    .y((d) => yScale(d[1]))
    .curve(curveBasis);

  let width;
  let stack = {};

  $: totalEngagement = Object.keys(polarization).map((k) => polarization[k]).reduce((acc, cur) => acc + cur);
  $: engagementExplained = totalEngagement / smi;

  $: Object.keys(polarization).forEach((k) => {
      const value = polarization[k];
      stack[k] = {
        value,
        width: Math.floor(100 * value / totalEngagement, 2)
      };
    });

  $: leftPathData = [
    [margin.left + valueWidth / 2 - engagementExplained * valueWidth / 2, 0],
    [margin.left + valueWidth / 2 - engagementExplained * valueWidth / 2, 0.3],
    [margin.left, 0.7],
    [margin.left, 1]
  ];

  $: rightPathData = [
    [valueWidth / 2 + engagementExplained * valueWidth / 2 - margin.right, 0],
    [valueWidth / 2 + engagementExplained * valueWidth / 2 - margin.right, 0.3],
    [width * 0.98 - margin.right, 0.7],
    [width * 0.98 - margin.right, 1]
  ];
</script>

<div class="polarization-strip"
     bind:clientWidth={width}>
  {#if (width > 0)}
    <svg class="pol-magnifier"
         width={width}
         height={magnifierHeight}>
      <path d={line(leftPathData)} />
      <path d={line(rightPathData)} />
      <text x={Math.max(15, valueWidth / 2)}
            y={yScale(1)}>
        {Math.round(engagementExplained * 100)}%
      </text>
    </svg>
  {/if}
  <div class="pol-layer-wrapper">
    {#each categories as category (category.id)}
      <div class="pol-layer pol-{category.id}"
           style="width: {stack[category.id].width}%;">
      </div>
    {/each}
  </div>
</div>

<style>
  .polarization-strip {
    width: 100%;
  }

  path {
    stroke: var(--dfrlab-gray);
    stroke-width: 1.5;
    stroke-dasharray: 2 3;
    stroke-linecap: round;
    fill: none;
  }

  text {
    font-family: var(--font-02);
    font-size: 0.6rem;
    text-anchor: middle;
    fill: var(--dfrlab-gray);
  }

  .pol-layer-wrapper {
    width: 100%;
    height: 1rem;
    border: none;
  }

  .pol-layer {
    display: inline-block;
    height: 100%;
  }
</style>
