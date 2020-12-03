<script>
  // controls pane holding filters and buttons
  import {
    disinformantNationFilter,
    platformFilter,
    methodFilter,
    sourceFilter,
    sourceCategoryFilter,
    attributionScoreFilter,
    attributionScoreDef,
    textSearchFilter,
    selectAllFilters,
    contextData,
    originalTimeDomain,
    highlightPolarization } from '../stores/filters';
  import { timeScale, attributionScoreScale } from '../stores/scales';

  import Dropdown from './Dropdown.svelte';
  import Slider from './Slider.svelte';
  import SearchText from './SearchText.svelte';
  import CheckboxPanel from './CheckboxPanel.svelte';
  import Share from './Share.svelte';

  export let timePoints;

  function addCount(filter, property, timePoints) {
    return filter.map((d) => ({
      ...d,
      count: timePoints.map((d) => d[property]).flat().filter((a) => a === d.id).length,
      liveCount: timePoints.filter((d) => d.show).map((d) => d[property]).flat().filter((a) => a === d.id).length
    }));
  }

  function handleButtonClick() {
    selectAllFilters();
    contextData.unselectAll();
    $highlightPolarization = false;
    if ($originalTimeDomain) {
      $timeScale.domain($originalTimeDomain);
      $timeScale = $timeScale;
      $originalTimeDomain = null;
    }
  }
</script>

{#if (timePoints)}
  <div class="controls-inner-wrapper">
    <div class="controls">
      <SearchText searchString={$textSearchFilter}
                  label="Search"
                  on:change={(e) => $textSearchFilter = e.detail}
                  on:reset={() => textSearchFilter.reset()} />
      <Slider value={$attributionScoreFilter}
              label="Attribution Score"
              min={attributionScoreDef[0]} 
              max={attributionScoreDef[1]}
              showHandleLabels={false}
              startColor={$attributionScoreScale(attributionScoreDef[0])}
              stopColor={$attributionScoreScale(attributionScoreDef[1])}
              on:changed={(e) => $attributionScoreFilter = e.detail} />
      <Dropdown items={addCount($disinformantNationFilter, 'disinformantNation', timePoints)}
                label="Disinformant Nation"
                superior
                on:itemsAdded={(e) => disinformantNationFilter.select(e.detail)}
                on:itemsRemoved={(e) => disinformantNationFilter.unselect(e.detail)} />
      <Dropdown items={addCount($platformFilter, 'platforms', timePoints)}
                label="Platform"
                on:itemsAdded={(e) => platformFilter.select(e.detail)}
                on:itemsRemoved={(e) => platformFilter.unselect(e.detail)} />
      <Dropdown items={addCount($sourceFilter, 'sourceFilter', timePoints)}
                label="Source"
                hideOneHitWonders
                superior
                on:itemsAdded={(e) => sourceFilter.select(e.detail)}
                on:itemsRemoved={(e) => sourceFilter.unselect(e.detail)} />
      <Dropdown items={addCount($sourceCategoryFilter, 'sourceCategory', timePoints)}
                label="Source Category"
                on:itemsAdded={(e) => sourceCategoryFilter.select(e.detail)}
                on:itemsRemoved={(e) => sourceCategoryFilter.unselect(e.detail)} />
      <Dropdown items={addCount($methodFilter, 'methods', timePoints)}
                label="Method"
                superior
                on:itemsAdded={(e) => methodFilter.select(e.detail)}
                on:itemsRemoved={(e) => methodFilter.unselect(e.detail)} />
      <Dropdown items={$contextData}
                label="Context Dataset"
                nameField="name"
                on:itemsAdded={(e) => contextData.select(e.detail)}
                on:itemsRemoved={(e) => contextData.unselect(e.detail)} />
      <button class="reset-filters"
              on:click={() => handleButtonClick()}>
        Reset
      </button>
    </div>
    <div class="checkbox-panel">
      <CheckboxPanel />
    </div>
    <Share />
  </div>
{/if}

<style>
  .controls-inner-wrapper {
    padding: 0.2rem;
    border: none;
    border-radius: 3px;
    background-color: var(--transparentbg);
  }

  .controls {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(9, 1fr);
    grid-gap: 0.3rem;
    margin-bottom: 0.7rem;
  }

  @media (min-width: 460px) {
    .controls {
      grid-template-rows: repeat(4, 1fr);
    }
  }

  @media (min-width: 1000px) {
    .controls {
      grid-template-rows: repeat(2, 1fr);
    }
  }

  @media (min-width: 1850px) {
    .controls {
      grid-template-rows: repeat(1, 1fr);
    }
  }

  button {
    pointer-events: all;
  }

  button.reset-filters {
    align-self: flex-end;
    min-width: 100px;
    height: 1.7rem;
    max-height: 1.7rem;
    margin: 0.3rem 0.3rem 0 0.3rem;
    padding: 0.1rem 0.3rem;
    font-family: var(--font-02);
    font-size: 0.8rem;
    font-weight: normal;
    line-height: 1.3rem;
    color: var(--usa-blue);
    background-color: var(--bg);
    border: 2px solid var(--usa-blue);
    border-radius: 3px;
    outline: none;
    overflow: hidden;
    transition: all 200ms ease;
  }

  button.reset-filters:hover {
    color: var(--bg);
    background-color: var(--usa-blue);
    cursor: pointer;
  }
</style>
