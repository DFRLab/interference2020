<script>
  import {
    disinformantNationFilter,
    platformFilter,
    methodFilter,
    sourceFilter,
    sourceCategoryFilter,
    attributionScoreFilter,
    attributionScoreDef,
    textSearchFilter,
    originalTimeDomain,
    contextData } from '../stores/filters';
  import { urlFromFilters } from '../utils/share';

  import Icon from 'svelte-awesome';
  import { twitter, clipboard } from 'svelte-awesome/icons';

  export let text = 'Share this view.';
  export let caseId = '';
  export let mode = 'standard';

  async function copyToClipBoard() {
    await navigator.clipboard.writeText(url);
    const previousText = text;
    text = 'Copied!';
    setTimeout(() => text = previousText, 3000);
  }

  $: url = urlFromFilters(
            $disinformantNationFilter,
            $platformFilter,
            $methodFilter,
            $sourceFilter,
            $sourceCategoryFilter,
            $attributionScoreFilter,
            $textSearchFilter,
            $contextData,
            caseId);
</script>

<div class="share">
  <p class:gray={mode === 'tooltip'}>{text}</p>
  <a class="twitter-share-button"
     class:gray={mode === 'tooltip'}
     href="https://twitter.com/intent/tweet?url={url.replace('#', '%23')}"
     data-size="large"
     target="_blank">
    <Icon data={twitter} scale="1.2" />
  </a>
  <span class="pseudolink"
        class:gray={mode === 'tooltip'}
        on:click={copyToClipBoard}>
    <Icon data={clipboard}/>
  </span>
</div>

<style>
  .share {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-02);
    font-size: 0.7rem;
    pointer-events: all;
  }

  p {
    color: var(--usa-blue);
  }

  a {
    margin: 0 0.4rem;
  }

  .gray {
    color: var(--text-darkgray);
    transition: all 200ms ease;
  }

  .gray:hover {
    color: var(--text-black);
  }
</style>
