<script>
  // a score bar used on case tooltips
  export let value = 0;
  export let minValue = 0;
  export let maxValue = 1;

  $: relState = (value - minValue) / (maxValue - minValue);
</script>

<div class="score-bar">
  <span class="inner-score-bar"
       style="width: {relState * 100}%;"></span>
</div>

<style>
  .score-bar {
    width: 100%;
    max-width: 70px;
    min-height: 10px;
    border: 1px solid var(--text-darkgray);
    border-radius: 3px;
    position: relative;
  }

  .inner-score-bar {
    height: 100%;
    background-color: var(--text-darkgray);
    border: none;
    position: absolute;
  }
</style>
