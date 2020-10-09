<script>
  // a source link
  import { draw } from 'svelte/transition';
  import { mapHeight, minDim } from '../stores/dimensions';
  import { linear } from 'svelte/easing';
  import { growDuration, bloomDuration, jitterFactor } from '../transitions/constants';
  import { curvyDoubleLine } from '../utils/paths';
  import { createTweenedPos } from '../transitions/tween';

  export let source;
  export let selected = 'unselected';
  export let hovered = 'unselected';
  export let extraFaint = false;

  const tweenedPos = createTweenedPos();

  function setOpacity(selected, hovered, extraFaint) {
    if (extraFaint) return 0.2 / 3 / 2;

    let opacity = 0.5 / source.disinformantNation.length;

    if (selected === 'selected' || hovered === 'selected') {
      opacity = 0.95;
      return(opacity);
    }
    if (selected === 'background' || hovered === 'background') opacity = 0.2 / source.disinformantNation.length;

    return(opacity);
  }

  $: $tweenedPos = {x: source.x, fy: source.fy, _x: source._x, _y: source._y};

  $: opacity = setOpacity(selected, hovered, extraFaint);
</script>

{#if (source.show)}
  <g class="source-link"
     style="opacity: {opacity}; transition: all 700ms ease;"
     class:selected={selected || hovered}>
    <path d={curvyDoubleLine(source.xCountry,
                             source.yCountry,
                             $tweenedPos._x,
                             $tweenedPos._y,
                             $tweenedPos.x,
                             $tweenedPos.fy + source.rSmiTot - 5,
                             source.shift,
                             $mapHeight / 15)}
          stroke-width={$minDim / 200}
          in:draw|local={{duration: growDuration, delay: source.id * jitterFactor, easing: linear}}
          out:draw|local={{duration: growDuration, delay: bloomDuration + source.id * jitterFactor, easing: linear}}></path>
  </g>
{/if}

<style>
  path {
    stroke: var(--usa-blue);
    fill: none;
  }

  .selected path {
    opacity: 1;
  }
</style>
