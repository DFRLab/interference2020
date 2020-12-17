<script>
  // a case tooltip (event = case)
  import { afterUpdate } from 'svelte';
  import { width, panelHeight, controlsHeight } from '../stores/dimensions';
  import { tooltip } from '../stores/eventSelections';
  import { fade, slide } from 'svelte/transition';
  import { timeFormat } from 'd3';
  import { extractHostname } from '../utils/misc';
  import {
    platformFilter,
    methodFilter,
    sourceFilter,
    sourceCategoryFilter,
    tagFilter,
    textSearchFilter,
    selectAllFilters} from '../stores/filters';
  import { maxScores } from '../inputs/scores';
  import { images } from '../inputs/dataPaths';

  import EventTooltipCross from './EventTooltipCross.svelte';
  import ScoreBar from './ScoreBar.svelte';
  import ScoreQuestions from './ScoreQuestions.svelte';
  import ImpactStrip from './ImpactStrip.svelte';
  import PolarizationLegend from './PolarizationLegend.svelte';
  import CibTable from './CibTable.svelte';
  import Share from './Share.svelte';

  const offset = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  };
  const contentOffset = -20;

  const attributionTf = timeFormat('%B %d, %Y');
  const activityTf = timeFormat('%B %Y');

  let elem;
  let tWidth, tHeight;
  let side;
  let left, top, contentTop;
  let scrollWrapper;

  let scoreQuestionsExpanded = false;

  function handleLiClick(type, item) {
    selectAllFilters();
    switch (type) {
      case 'platform': platformFilter.selectOne(item); break;
      case 'method': methodFilter.selectOne(item); break;
      case 'source': sourceFilter.selectOne(item); break;
      case 'sourceCategory': sourceCategoryFilter.selectOne(item); break;
      case 'tag': tagFilter.selectOne(item); break;
    }
  }

  function highlight(s) {
    if (!$textSearchFilter || $textSearchFilter === '') return s;
    return s.replace(new RegExp($textSearchFilter.toLowerCase().split(' or ').join('|'), 'gi'), (match) => `<span class="highlighted">${match}</span>`);
  }

  $: if (showTooltip) {
    scoreQuestionsExpanded = false;

    side = $width - $tooltip.tp.x < $width / 2 ? 'left' : 'right';
    
    top = $tooltip.tp.fy - offset.top;

    // adjust for the difference between mouse hover point and balloon center
    const balloonPos = $tooltip.e.pageY;

    // the regular tooltip offset to the balloon
    contentTop = contentOffset;

    // if the tooltip hits the lower page boundary
    if (balloonPos + contentTop + tHeight - window.pageYOffset > window.innerHeight) {
      // console.log('lower')
      contentTop -= balloonPos + tHeight - window.pageYOffset - window.innerHeight;
    }

    // if the tooltip hits the upper page boundary
    if (balloonPos + contentTop - window.pageYOffset < $controlsHeight) {
      // console.log('upper')
      contentTop -= balloonPos + contentTop - window.pageYOffset - $controlsHeight - 50;
    }

    // // if the tooltip hits the uper border of the SVG
    if ($tooltip.tp.fy + contentTop < $controlsHeight) {
      // console.log('border')
      contentTop -= $tooltip.tp.fy + contentTop - $controlsHeight;
    }
    
    if (side === 'left') {
      left = $tooltip.tp.x - tWidth + offset.left;
    } else if (side === 'right') {   
      left = $tooltip.tp.x - offset.left;
    }

    if (scrollWrapper) scrollWrapper.scrollTo(0, 0);
  }

  $: showTooltip = ($tooltip && $tooltip.tp && $tooltip.tp.show);
</script>

{#if (showTooltip)}
  <div class="tooltip"
       style="left: {left}px; top: {top}px;"
       bind:clientWidth={tWidth}
       on:click|stopPropagation
       on:mouseover|stopPropagation
       transition:fade={{duration: 200}}>
    <EventTooltipCross {tWidth} {offset} {side} />
    <div class="mouse-catcher"
          style="width: {tWidth}px;
                 height: {Math.max(10, Math.abs(contentTop) - $tooltip.tp.rSmiTot + 25)}px;
                 position: absolute;
                 top: {contentTop - 10}px;"></div>
    <div class="mouse-catcher"
          style="width: {tWidth}px;
                 height: {Math.abs(tHeight - Math.abs(contentTop))}px;
                 position: absolute;
                 top: {$tooltip.tp.rSmiTot + 5}px;"></div>
    <div class="content"
         bind:this={elem}
         bind:clientHeight={tHeight}
         style="top: {contentTop}px; margin: 0px {$tooltip.tp.rSmiTot / 3 + offset.left}px;">
      <div class="scroll-wrapper"
           bind:this={scrollWrapper}>
        <div class="title">
          <div class="title-top">
            <div class="title-dates">
              <p>{attributionTf($tooltip.tp.attributionDate)} | {@html highlight($tooltip.tp.disinformantAttribution)}</p>
              <p>Active: 
                {#if ($tooltip.tp.startDate && !$tooltip.tp.endDate)}
                  {activityTf($tooltip.tp.startDate)} <span class="small">(approx.)</span>
                {:else if (!$tooltip.tp.startDate && $tooltip.tp.endDate)}
                  {activityTf($tooltip.tp.endDate)} <span class="small">(approx.)</span>
                {:else if ($tooltip.tp.startDate && $tooltip.tp.endDate)}
                  {#if (activityTf($tooltip.tp.startDate) === activityTf($tooltip.tp.endDate))}
                    {activityTf($tooltip.tp.startDate)}
                  {:else}
                    {activityTf($tooltip.tp.startDate)} to {activityTf($tooltip.tp.endDate)}
                  {/if}
                {:else}
                  unspecified
                {/if}
              </p>
            </div>
            <Share text="" caseId={$tooltip.tp.id} mode="tooltip" />
          </div>
          <h2>{@html highlight($tooltip.tp.shortTitle)}</h2>
          <div class="score-bars">
            <div class="score-bar-wrapper">
              <ScoreBar value={$tooltip.tp.attributionCredibilityScore} maxValue={maxScores.attributionCredibilityScore} />
              <p>Credibility</p>
            </div>
            <div class="score-bar-wrapper">
              <ScoreBar value={$tooltip.tp.attributionObjectivityScore} maxValue={maxScores.attributionObjectivityScore} />
              <p>Objectivity</p>
            </div>
            <div class="score-bar-wrapper">
              <ScoreBar value={$tooltip.tp.attributionEvidenceScore} maxValue={maxScores.attributionEvidenceScore} />
              <p>Evidence</p>
            </div>
            <div class="score-bar-wrapper">
              <ScoreBar value={$tooltip.tp.attributionTransparencyScore} maxValue={maxScores.attributionTransparencyScore} />
              <p>Transparency</p>
            </div>
            <span class="score-info-icon disable-select" on:click|self={() => scoreQuestionsExpanded = !scoreQuestionsExpanded}>
              {scoreQuestionsExpanded ? 'X' : '?'}
            </span>
          </div>
          {#if (scoreQuestionsExpanded)}
            <div class="store-questions-wrapper" transition:slide|local>
              <ScoreQuestions timePoint={$tooltip.tp} />
            </div>
          {/if}
        </div>
        <div class="smi">
          <h3>Attribution impact</h3>
          {#if ($tooltip.tp.smiPending)}
            <p>pending</p>
          {:else}
            <ul>
              <ImpactStrip value={$tooltip.tp.smiFacebook}
                           polarization={$tooltip.tp.polarization}
                           label="Facebook" />
              <ImpactStrip value={$tooltip.tp.smiTwitter}
                           polarization={$tooltip.tp.polarization}
                           label="Twitter" />
              <ImpactStrip value={$tooltip.tp.smiReddit}
                           polarization={$tooltip.tp.polarization}
                           label="Reddit" />
            </ul>
            {#if ($tooltip.tp.polarization.fulfills10Articles || $tooltip.tp.polarization.fulfills25Percent)}
              <PolarizationLegend />
            {/if}
          {/if}
        </div>
        {#if ($tooltip.tp.imageUrl)}
          <div class="image">
            <img src="{images}{$tooltip.tp.caseHash}.jpg" alt={$tooltip.tp.shortTitle} />
            <p>{$tooltip.tp.imageCredit}</p>
          </div>
        {/if}
        <div class="description">
          <h3>Description</h3>
          <p>{@html highlight($tooltip.tp.shortDescription)}</p>
        </div>
        {#if ($tooltip.tp.cib.hasCib)}
          <div class="cib">
            <h3>Removed content</h3>
            <CibTable data={$tooltip.tp.cib} />
          </div>
        {/if}
        {#if (!($tooltip.tp.tags.length === 1 && $tooltip.tp.tags[0] === 'unspecified'))}
          <div class="tags">
            <h3>Tags</h3>
            <ul>
              {#each $tooltip.tp.tags as tag (tag)}
                <li class="card" on:click|self={() => handleLiClick('tag', tag)}>{@html highlight(tag)}</li>
              {/each}
            </ul>
          </div>
        {/if}
        <div class="platforms">
          <h3>Platforms</h3>
          <ul>
            {#each $tooltip.tp.platforms as platform (platform)}
              <li class="card" on:click|self={() => handleLiClick('platform', platform)}>{@html highlight(platform)}</li>
            {/each}
          </ul>
        </div>
        <div class="methods">
          <h3>Methods</h3>
          <ul>
            {#each $tooltip.tp.methods as method (method)}
              <li class="card" on:click|self={() => handleLiClick('method', method)}>{@html highlight(method)}</li>
            {/each}
          </ul>
        </div>
        <div class="source">
          <h3>Source{$tooltip.tp.source.length !== 1 ? 's' : ''}</h3>
          <ul>
            {#each $tooltip.tp.source as source, i (source)}
              <li class="card" on:click|self={() => handleLiClick('source', $tooltip.tp.sourceFilter[i] ? $tooltip.tp.sourceFilter[i] : $tooltip.tp.sourceFilter.slice(-1)[0])}>
                {#if ($tooltip.tp.sourceFilter[i] && $tooltip.tp.sourceFilter[i] !== source)}
                  {@html highlight(source)} / {@html highlight($tooltip.tp.sourceFilter[i])}
                {:else if (!$tooltip.tp.sourceFilter[i] && $tooltip.tp.sourceFilter.slice(-1)[0] !== source)}
                  {@html highlight(source)} / {@html highlight($tooltip.tp.sourceFilter.slice(-1)[0])}
                {:else if ($tooltip.tp.sourceFilter[i])}
                  {@html highlight($tooltip.tp.sourceFilter[i])}
                {:else}
                  {@html highlight($tooltip.tp.sourceFilter.slice(-1)[0])}
                {/if}
              </li>
            {/each}
          </ul>
        </div>
        <div class="source-category">
          <h3>Source categor{$tooltip.tp.sourceCategory.length !== 1 ? 'ies' : 'y'}</h3>
          <ul>
            {#each $tooltip.tp.sourceCategory as cat (cat)}
              <li class="card" on:click|self={() => handleLiClick('sourceCategory', cat)}>{@html highlight(cat)}</li>
            {/each}
          </ul>
        </div>
        <div class="link">
          <h3>Link</h3>
          <a href={$tooltip.tp.attributionUrl} target="_blank" class="no-float">{extractHostname($tooltip.tp.attributionUrl)}</a>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .tooltip {
    width: 70%;
    /* min-width: 550px; */
    font-family: var(--font-02);
    position: absolute;
    z-index: 10000;
  }

  @media (min-width: 800px) {
    .tooltip {
      width: 21%;
      min-width: 550px;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    max-width: 550px;
    max-height: 60vh;
    color: var(--text-black);
    background-color: var(--bg);
    pointer-events: all;
    box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.07), 
                0 4px 8px rgba(0,0,0,0.07), 
                0 8px 16px rgba(0,0,0,0.07),
                0 16px 32px rgba(0,0,0,0.07), 
                0 32px 64px rgba(0,0,0,0.07);
    position: absolute;
  }

  .scroll-wrapper {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .scroll-wrapper .title {
    padding: 1rem;
    background-image: linear-gradient(var(--usa-lightlightred), var(--usa-lightred));
    position: relative;
  }

  .title-top {
    display: flex;
    align-items: flex-start;
    width: 100%;
  }

  .title-dates {
    flex: 1;
  }

  .title-dates p {
    color: var(--text-black);
    font-size: 0.7rem;
  }

  .scroll-wrapper > div {
    width: 100%;
    padding: 0.5rem 1rem;
  }

  h2, h3 {
    color: var(--text-black);
  }

  h2 {
    margin: 1rem 0;
    font-size: 1.1rem;
    font-weight: bold;
  }

  h3 {
    margin: 0 0 0.1rem 0;
    font-size: 0.9rem;
    font-weight: normal;
    clear: both;
  }

  .score-bars {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .score-bar-wrapper {
    flex: 1 1 0;
    display: inline-block;
  }

  .score-bar-wrapper p {
    font-size: 0.7rem;
  }

  .score-bars span.score-info-icon {
    width: 1rem;
    height: 1rem;
    margin: 0;
    padding: 0 auto 0.1rem auto;
    font-size: 0.7rem;
    font-weight: bold;
    text-align: center;
    color: var(--usa-lightred);
    border: 2px solid var(--text-darkgray);
    border-radius: 2px;
    background-color: var(--text-darkgray);
    transition: all 400ms ease;
    cursor: pointer;
  }

  .score-bars span.score-info-icon:hover {
    color: var(--text-darkgray);
    background-color: var(--usa-lightred);
  }

  .store-questions-wrapper {
    position: relative;
  }

  h3 {
    margin: 0 0 0.1rem 0;
    font-size: 0.9rem;
    font-weight: normal;
    color: var(--text-black);
    clear: both;
  }

  p {
    font-size: 0.8rem;
    line-height: 1.5;
  }

  ul {
    display: inline-block;
    list-style-type: none;
  }

  li.card, a {
    float: left;
    margin: 0.1rem 0.2rem 0.1rem 0;
    padding: 0.1rem 0.3rem;
    font-size: 0.8rem;
    color: var(--text-black);
    border: none;
    border-radius: 0.2rem;
    background-color: var(--usa-lightlightred);
    cursor: pointer;
    user-select: none;
    transition: background-color 200ms ease;
    box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.07);
  }

  .smi ul {
    display: flex;
  }

  a {
    text-decoration: none;
  }

  a:hover, li.card:hover {
    background-color: var(--usa-lightred);
  }

  .small {
    font-size: 0.6rem;
  }

  .scroll-wrapper .image {
    min-height: 1%;
    width: 100%;
  }

  .image img {
    width: 100%;
  }

  .image p {
    width: 100%;
    font-size: 0.5rem;
    text-align: right;
  }

  .no-float {
    float: none;
  }
</style>
