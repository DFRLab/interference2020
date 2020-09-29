<script>
  // a custom dropdown
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';
  import { sortConsistently } from '../utils/misc';

  import Checkbox from './Checkbox.svelte';

  export let items = [];
  export let label = '';
  export let nameField = 'id';
  export let hideOneHitWonders = false;
  export let superior = false;

  const dispatch = createEventDispatcher();

  let elem;
  let expanded = false;

  function handleBodyClick() {
    expanded = false
  }

  function toggleExpanded() {
    expanded = !expanded;
  }

  function selectAll() {
    dispatch('itemsAdded', items.map((d) => d.id));
  }

  function unselectAll() {
    dispatch('itemsRemoved', items.map((d) => d.id));
  }

  function handleDropdownClick() {
    toggleExpanded();
  }

  function handleChoiceClick(id) {
    if (!items.filter((d) => d.selected).map((d) => d.id).includes(id)) {
      dispatch('itemsAdded', id);
    } else {
      dispatch('itemsRemoved', id);
    }
  }
</script>

<svelte:body on:click={(e) => handleBodyClick(e)}></svelte:body>

<div class="dropdown" bind:this={elem}>
  <div class="label">
    {label}
  </div>
  <div class="selected-items" on:click|stopPropagation={handleDropdownClick}>
    <span class="selected-items-icon"></span>
    <span class="selected-items-text">
      {items.filter((d) => d.selected).length === 0
        ? 'none'
        : (items.every((d) => d.selected && items.length > 1)
          ? 'all'
          : items.filter((d) => d.selected).map((d) => d[nameField]).join(', '))}
    </span>
    <button class="selected-items-arrow">
      <svg class:expanded width="15" height="10">
        <path d="M0 0L15 0L7.5 10Z"></path>
      </svg>
    </button>
  </div>
  <div class="choice-wrapper">
    {#if (expanded)}
      <div class="choice" transition:slide class:superior>
        <div class="choice-controls">
          <button class="choice-controls-selectall" on:click|stopPropagation={selectAll}>Select all</button>
          <button class="choice-controls-unselectall" on:click|stopPropagation={unselectAll}>Unselect all</button>
        </div>
        <ul class="choice-list">
          {#each items.sort((a, b) => -sortConsistently(a, b, 'id', 'id')) as item, i (item.id)}
            {#if (!(hideOneHitWonders && item.count === 1))}
              <li on:click|stopPropagation>
                <Checkbox id="{label}-{i}"
                          checked={item.selected}
                          on:click={() => handleChoiceClick(item.id)}>
                  <span class="choice-entry-name">{item[nameField]}</span>
                  {#if (item.liveCount)}
                    <span class="choice-entry-count">({item.liveCount})</span>
                  {:else if (item.source)}
                    <span class="choice-entry-source">({item.source})</span>
                  {/if}
                </Checkbox>
              </li>
            {/if}
          {/each}
        </ul>
        {#if (hideOneHitWonders)}
          <p class="info">{label}s with only one result in the dataset are hidden.</p>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .dropdown {
    align-self: flex-end;
    display: flex;
    flex-direction: column;
    font-family: var(--font-02);
    width: 200px;
    max-width: 200px;
    min-width: 200px;
    margin: 0.3rem 0.3rem 0 0.3rem;
    position: relative;
    pointer-events: all;
  }

  .label {
    margin: 0 0 0.1rem 0;
    font-size: 0.7rem;
    color: var(--usa-blue);
  }

  .selected-items {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 1.7rem;
    padding: 0.1rem 0.3rem;
    font-size: 0.8rem;
    background-color: var(--bg);
    border: 2px solid var(--usa-blue);
    border-radius: 3px;
    cursor: pointer;
  }

  .selected-items-text {
    width: 100%;
    color: var(--text-black);
    overflow: hidden;
    white-space: nowrap;
  }

  .selected-items-arrow {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .selected-items-arrow svg {
    margin-top: 0.2rem;
    stroke: none;
    fill: var(--usa-blue);
    transition: transform 400ms ease;
  }

  .selected-items-arrow svg.expanded{
    transform: rotate(-540deg);
  }

  .choice-wrapper {
    width: 100%;
    height: 0;
    position: relative;
  }

  .choice {
    width: 100%;
    border: 2px solid var(--usa-lightblue);
    border-radius: 3px;
    background-color: var(--bg);
    position: absolute;
    z-index: 12000;
    top: 0;
  }

  .superior {
    z-index: 100000 !important;
  }

  .choice-controls {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .choice-controls button {
    margin: 0.5rem;
    padding: 0.2rem 0.5rem;
    color: var(--bg);
    border: none;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
  }

  button.choice-controls-selectall {
    background-color: var(--usa-lightblue);
  }

  button.choice-controls-unselectall {
    background-color: var(--usa-lightred);
  }

  ul.choice-list {
    width: 100%;
    max-height: 600px;
    overflow-y: scroll;
    list-style-type: none;
    font-size: 0.8rem;
    position: relative;
  }

  ul.choice-list li {
    padding: 0.4rem 0.5rem;
    cursor: pointer;
    background-color: var(--bg);
    transition: background-color 200ms ease;
  }

  ul.choice-list li:hover {
    background-color: var(--usa-lightblue);
  }

  .choice-entry-count, .choice-entry-source {
    font-size: 0.8em;
  }

  .choice-entry-source {
    display: block;
  }

  p.info {
    padding: 0.4rem 0.5rem;
    font-size: 0.7rem;
    color: var(--dfrlab-gray);
  }
</style>
