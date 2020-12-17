<script>
  import { highlightPolarization, highlightCib } from '../stores/filters';
  import { copytooltipable } from '../actions/copytooltipable';

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
      <span use:copytooltipable={{content: 'The political leanings of 600+ media entities – using political data from the AllSides Media Bias Ratings – was applied to the web links found in Attribution Impact. Since not all web links had matching AllSides data, the polarization data filter shows only cases where there were ten or more AllSides-matching articles and/or cases where 25 percent or more of articles matched with AllSides data. The stem lines on the polarization data filter are colored based on the mean political polarization of that case.', showClickMessage: false}}>Polarization data filter</span>
    </Checkbox>
  </li>
  <!-- <li>
    <Checkbox id="checkboxpanel-checkbox-cib"
              checked={$highlightCib}
              on:click={() => handleClick('cib')}>
      <span use:copytooltipable={{content: 'Some content', showClickMessage: false}}>CIB data filter</span>
    </Checkbox>
  </li> -->
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
