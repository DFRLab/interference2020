<script>
  // tooltip on the copy
  import { fade } from 'svelte/transition';

  export let title = '';
  export let content = '';
  export let x = 0;
  export let y = 0;
  export let showClickMessage = true;

  const maxWidth = 300;
  const margin = 10;

  let width = maxWidth;
  let left = 0;

  $: {
    if (x - width / 2 < 0) {
      left = margin;
    } else {
      left = x - width / 2;
    }

    if (x + width - document.body.offsetWidth > 0) {
      left = document.body.offsetWidth - width - margin;
    }
  }
</script>

<div class="copy-tooltip"
     bind:clientWidth={width}
     style="left: {left}px; top: {y}px; width: {maxWidth}px;"
     transition:fade={{duration: 200}}>
  <div class="content">
    <h2>{title}</h2>
    <p>{content}</p>
    {#if (showClickMessage)}
      <p class="footer">Click to read more.</p>
    {/if}
  </div>
</div>

<style>
  .copy-tooltip {
    margin-right: 1rem;
    position: absolute;
    z-index: 10000;
  }

  .content {
    width: 100%;
    height: 100%;
    padding: 1rem;
    font-family: var(--font-02);
    color: var(--text-black);
    background-color: var(--bg);
    box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.07), 
                0 4px 8px rgba(0,0,0,0.07), 
                0 8px 16px rgba(0,0,0,0.07),
                0 16px 32px rgba(0,0,0,0.07), 
                0 32px 64px rgba(0,0,0,0.07);
  }

  h2 {
    margin: 0.2rem 0;
    font-size: 0.9rem;
  }

  p {
    font-size: 0.8rem;
    line-height: 1.5;
  }

  p.footer {
    margin: 0.2rem 0;
    font-size: 0.7rem;
  }
</style>
