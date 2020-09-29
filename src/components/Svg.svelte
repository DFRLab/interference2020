<script>
  // the whole SVG wrapper
  import { width, height, panelHeight } from '../stores/dimensions';
  import { selected, hovered } from '../stores/eventSelections';
  import Defs from './Defs.svelte';
  import BackgroundChart from './BackgroundChart.svelte';
  import Brush from './Brush.svelte';
  import Events from './Events.svelte';
  import Sources from './Sources.svelte';
  import Timeline from './Timeline.svelte';
  import Legend from './Legend.svelte';
  import Labels from './Labels.svelte';

  export let timePoints;

  function handleMouseover() {
    $hovered = null
  }

  function handleClick(event) {
    selected.reset();
  }

</script>

<svg viewBox="0 0 {$width} {$height}"
     width={$width}
     height={$height}
     on:mouseover={handleMouseover}
     on:click={handleClick}>
  <Defs />
  <rect x="0" y="0" width={$width} height={$panelHeight*1.1}></rect>
  <BackgroundChart />
  <Sources {timePoints} />
  <Labels />
  <Brush />
  <Timeline />
  <Legend />
  <Events {timePoints} />
</svg>

<style>
  svg {
    position: absolute;
    z-index: 1000;
  }

  rect {
    fill: url(#bg-gradient);
  }
</style>
