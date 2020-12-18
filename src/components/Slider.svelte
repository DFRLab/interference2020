<script>
  // a custom slider for score selection
  import { createEventDispatcher, onMount } from 'svelte';
  import { scaleLinear } from 'd3';
  import { slidable } from '../actions/slidable';

  export let lockInMode = true;
  export let label = '';
  export let showLabel = true;
  export let min = 0;
  export let max = 10;
  export let value = [0, 10];
  export let showHandleLabels = true;
  export let startColor = 'white';
  export let stopColor = 'red';
  export let barOpacity = 1;
  export let showBorder = true;

  const dispatch = createEventDispatcher();
  const handleWidth = 17;

  const pos = {
    left: 0,
    right: 0
  };

  let sliderWidth = 0;

  function handleSlide(e, side) {
    const newPos = pos[side] + e.detail.dx;

    if (newPos < 0 || newPos > sliderWidth) return;
    if (side === 'left' && newPos > pos.right) return;
    if (side === 'left' && newPos < scale.range()[0]) return;
    if (side === 'right' && newPos < pos.left) return;
    if (side === 'right' && newPos > scale.range()[1]) return;
    
    pos[side] = newPos;
  }

  function handleSlideEnd(e, side) {
    if (lockInMode) {
      dispatch('changed', [Math.round(scale.invert(pos.left), 0),
                         Math.round(scale.invert(pos.right), 0)]);
    } else {
      dispatch('changed', [scale.invert(pos.left), scale.invert(pos.right)]);
    }
  }

  $: scale = scaleLinear()
      .domain([min, max])
      .range([handleWidth / 2, sliderWidth - 1.7 * handleWidth]);

  $: pos.left = scale(value[0]) || 0;
  $: pos.right = scale(value[1]) || 0;
</script>

<div class="slider"
     bind:clientWidth={sliderWidth}
     style="--handle-width: {handleWidth}px;">
  {#if (showLabel)}
    <div class="label">
      {label}
    </div>
  {/if}
  <div class="slider-body" class:border={showBorder}>
    <div class="slider-selected-range"
         style="width: {sliderWidth - 2 * handleWidth}px;
                margin-left: {1 * handleWidth}px;
                opacity: {barOpacity};
                background: linear-gradient(90deg, {startColor}, {stopColor});"></div>
    <div class="slider-handle"
         class:no-label={!showHandleLabels}
         style="left: {(Math.abs(value[0] - value[1]) < 0.1) ? pos.left - 5 : pos.left}px;"
         use:slidable
         on:slide={(e) => handleSlide(e, 'left')}
         on:slideend={(e) => handleSlideEnd(e, 'left')}>
      <span class="disable-select">{showHandleLabels ? Math.round(scale.invert(pos.left), 0) : ''}</span>
    </div>
    <div class="slider-handle"
         class:no-label={!showHandleLabels}
         style="left: {(Math.abs(value[0] - value[1]) < 0.1) ? pos.right + 5 : pos.right}px;"
         use:slidable
         on:slide={(e) => handleSlide(e, 'right')}
         on:slideend={(e) => handleSlideEnd(e, 'right')}>
      <span class="disable-select">{showHandleLabels ? Math.round(scale.invert(pos.right), 0) : ''}</span>
    </div>
  </div>
</div>

<style>
  .slider {
    display: flex;
    flex-direction: column;
    font-family: var(--font-02);
    width: 200px;
    max-width: 200px;
    margin: 0.3rem 0.3rem 0 0.3rem;
    position: relative;
    pointer-events: all;
  }

  .label {
    margin: 0 0 0.1rem 0;
    font-size: 0.7rem;
    color: var(--usa-blue);
  }

  .slider-body {
    display: flex;
    align-items: center;
    width: 100%;
    height: 1.7rem;
    padding: 0.1rem 0;
    font-size: 0.7rem;
    background-color: var(--bg);
    border: none;
    position: relative;
  }

  .border {
    border: 2px solid var(--usa-blue);
    border-radius: 3px;
  }

  .slider-selected-range {
    height: 8px;
    border: none;
    border-radius: 2px;
    position: absolute;
    z-index: 100;
  }

  .slider-handle {
    width: var(--handle-width);
    height: var(--handle-width);
    border: 2px solid var(--usa-blue);
    border-radius: 50%;
    background-color: var(--bg);
    cursor: pointer;
    position: absolute;
    z-index: 10000;
  }

  .slider-handle > span {
    width: 100%;
    height: 100%;
    font-size: 0.7rem;
    text-align: center;
    color: var(--usa-blue);
    position: absolute;
  }
</style>
