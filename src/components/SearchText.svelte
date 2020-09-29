<script>
  // free text search bar
  import { createEventDispatcher } from 'svelte';

  export let searchString = '';
  export let label = '';

  const dispatch = createEventDispatcher();

  function reset() {
    searchString = '';
    search();
  }

  function handleKeyUp(e) {
    if (e && e.keyCode === 13) search();
  }

  function handleGoClick() {
    search();
  }

  function search() {
    dispatch('change', searchString);
  }
</script>

<div class="search-text">
  <div class="label">
    <p>{label}</p>
    <p>|</p>
    <span on:click={() => reset()}>Reset</span>
  </div>
  <div class="search">
    <input id="table-search-field"
            type="text"
            placeholder="Type and press enter"
            bind:value={searchString}
            on:keyup={(e) => handleKeyUp(e)} />
    {#if (searchString !== '')}
      <span class="button-fields">
        <span class="reset"
                class:active={searchString}
                on:click={() => searchString = ''}>
          x
        </span>
        <span class="go"
              class:active={searchString}
              on:click={() => handleGoClick()}>
          Go
        </span>
      </span>
    {/if}
  </div>
</div>

<style>
  .search-text {
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
    display: flex;
    margin: 0 0 0.1rem 0;
    font-size: 0.7rem;
    color: var(--usa-blue);
  }

  .label > * {
    padding-right: 0.2rem;
  }

  .label span {
    margin: 0 -0.1rem;
    padding: 0 0.1rem;
    color: var(--usa-blue);
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: all 200ms ease;
  }

  .label span:hover {
    color: var(--bg);
    background-color: var(--usa-blue);
  }

  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 1.7rem;
    font-size: 0.8rem;
    background-color: var(--bg);
    border: 2px solid var(--usa-blue);
    border-radius: 3px;
    position: relative;
  }

  input {
    width: 100%;
    height: 100%;
    padding: 0.1rem 2.3rem 0.1rem 0.3rem;
    font-size: 0.8rem;
    color: var(--text-black);
    background-color: var(--bg);
    border: none;
  }

  .button-fields {
    display: block;
    position: absolute;
    bottom: 0.2rem;
    right: 0.3rem;
    z-index: 10001;
  }

  .reset {
    display: none;
    margin-right: 0.3rem;
    cursor: pointer;
  }

  .go {
    cursor: pointer;
  }
</style>
