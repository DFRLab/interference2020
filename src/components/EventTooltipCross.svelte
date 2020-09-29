<script>
  // the little cross showing up on hovered balloons
  import { draw } from 'svelte/transition';
  import { oneLineTrim } from 'common-tags';

  export let tWidth = 0;
  export let offset = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  };
  export let side = 'left';
</script>

<svg viewBox="0 0 {offset.left * 2} {offset.top * 2}"
     width={offset.left * 2}
     height={offset.top * 2}
     style="left: {side === 'right' ? 0 : tWidth - 2 * offset.left}px;">
  <path d="M{offset.left} 0L{offset.left} {offset.top * 2}"></path>
  <path d="M0 {offset.top}L{offset.left * 2} {offset.top}"></path>
</svg>

<style>
  svg {
    pointer-events: none;
    position: absolute;
    z-index: 0;
  }

  path {
    stroke: var(--usa-blue);
    stroke-width: 2px;
    stroke-linecap: round;
    fill: none;
  }
</style>
