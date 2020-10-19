<script>
  // collection of viz labels
  import { timeScale, smiTotalYScale } from '../stores/scales';
  import { margin } from '../stores/dimensions';
  import { timeFormat, format } from 'd3';
  import { panelHeight } from '../stores/dimensions';

  const lineLength = 70;
  const offset = 5;

  const commaFormat = format(',');
  const tf = timeFormat('%b %d, %Y');

  let yScaleText, mapScaleText, timeScaleText;
</script>

<g class="labels disable-select">
  <g class="time-scale"
     transform="translate(0 {$smiTotalYScale.range()[0]})">
    {#each $timeScale.ticks(3) as tick}
      <g class="tick"
         transform="translate({$timeScale(tick)} 20)">
        <circle cx="0" cy="-20" r="5" />
        <text class="bg">{tf(tick).replace('Jan 01, ', '')}</text>
        <text>{tf(tick).replace('Jan 01, ', '')}</text>
      </g>
    {/each}
    <g class="today" transform="translate({$timeScale(new Date())} 20)">
      <circle cx="0"
              cy="-20"
              r="5"></circle>
      <text class="bg">Today</text>
      <text>Today</text>
    </g>
    <g class="time-scale-label" transform="translate({15 + $timeScale.range()[0] - $margin.left / 1.5} -15)">
      <path d="M0 0l{lineLength} 0"></path>
      <text class="bg"
            dx={lineLength + offset}
            dy="4">Attribution Date</text>
      <text bind:this={timeScaleText}
            dx={lineLength + offset}
            dy="4">Attribution Date</text>
      <path d="M{timeScaleText ? timeScaleText.getComputedTextLength() + lineLength + 2 * offset: 0} 0l{lineLength} 0"
            marker-end="url(#arrow)"></path>
    </g>
  </g>
  <g class="y-scale-ticks"
     transform="translate({15 + $timeScale.range()[0] - $margin.left / 1.5} 0)">
    {#each $smiTotalYScale.ticks(5).slice(1) as tick}
      <g class="tick"
          transform="translate(0 {$smiTotalYScale(tick)})">
        <text>{commaFormat(tick)}</text>
      </g>
    {/each}
  </g>
  <g class="y-scale"
     transform="translate({$timeScale.range()[0] - $margin.left / 1.5} {0.95 * $smiTotalYScale.range()[0]})">
    <path d="M0 0l0 {-lineLength}"></path>
    <text bind:this={yScaleText}
          transform="rotate(270)"
          dx={lineLength + offset}
          dy="4">Attribution Impact</text>
    <path d="M0 {yScaleText ? -yScaleText.getComputedTextLength() - lineLength - 2 * offset: 0}l0 {-lineLength}"
          marker-end="url(#arrow)"></path>
  </g>
  <g class="map-scale"
     transform="translate({$timeScale.range()[0] - $margin.left / 1.5} {1.05 * $panelHeight})">
    <path d="M0 0l0 {lineLength}"></path>
    <text bind:this={mapScaleText}
          transform="rotate(270)"
          dx={mapScaleText ? -mapScaleText.getComputedTextLength() - lineLength - offset: 0}
          dy="4">Disinformant Nations</text>
    <path d="M0 {mapScaleText ? mapScaleText.getComputedTextLength() + lineLength + 2 * offset: 0}l0 {lineLength}"></path>
  </g>
</g>

<style>
  .time-scale text {
    fill: var(--text-darkgray);
    font-family: var(--font-02);
    font-size: 0.7rem;
    text-anchor: middle;
  }

  .time-scale-label text {
    text-anchor: start;
  }

  .time-scale text.bg {
    stroke: var(--bg);
    stroke-width: 0.1rem;
    stroke-opacity: 0.8;
    fill: var(--bg);
  }

  .time-scale circle {
    stroke: none;
    fill: var(--dfrlab-gray);
  }

  .y-scale-ticks text, .y-scale text, .map-scale text {
    fill: var(--text-darkgray);
    font-family: var(--font-02);
    font-size: 0.7rem;
  }

  .y-scale-ticks text {
    font-size: 0.6rem;
  }

  .time-scale path, .y-scale path, .map-scale path {
    stroke: var(--text-darkgray);
    stroke-width: 0.1rem;
  }
</style>
