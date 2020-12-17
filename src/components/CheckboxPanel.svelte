<script>
  import { highlightPolarization, highlightCib } from '../stores/filters';

  import Checkbox from './Checkbox.svelte';

  function handleClick(type) {
    switch (type) {
      case 'polarization':
        $highlightPolarization = !$highlightPolarization;
        break;
      case 'cib':
        $highlightCib = !$highlightCib;
        break;
    }
  }
</script>

<ul class="checkboxpanel-wrapper">
  <li>
    <Checkbox id="checkboxpanel-checkbox-polarization"
              checked={$highlightPolarization}
              on:click={() => handleClick('polarization')}>
      <span>Polarization data filter</span>
    </Checkbox>
  </li>
  <li>
    <Checkbox id="checkboxpanel-checkbox-cib"
              checked={$highlightCib}
              on:click={() => handleClick('cib')}>
      <span>CIB data filter</span>
    </Checkbox>
  </li>
</ul>

<style>
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0.5rem 0;
    list-style-type: none;
  }

  li {
    padding: 0.4rem 0;
    position: relative;
  }

  span {
    display: inline-block;
    margin: 0.15rem 0 0 0.5rem;
    font-family: var(--font-02);
    font-size: 0.8rem;
    color: var(--usa-blue);
  }
</style>
