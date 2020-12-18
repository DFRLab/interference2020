<script>
  import {
    highlightPolarization,
    highlightCib,
    polarizationFilter,
    polarizationDef } from '../stores/filters';
  import { polarizationScale } from '../stores/scales';
  import { copytooltipable } from '../actions/copytooltipable';

  import Checkbox from './Checkbox.svelte';
  import Slider from './Slider.svelte';

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
      <span use:copytooltipable={{content: 'The political leanings of 600+ media entities – using political data from the AllSides Media Bias Ratings – was applied to the web links found in Attribution Impact. Since not all web links had matching AllSides data, the polarization data filter shows only cases where there were ten or more AllSides-matching articles and/or cases where 25 percent or more of articles matched with AllSides data. The stem lines on the polarization data filter are colored based on the mean political polarization of that case.', showClickMessage: false}}>
        Partisan Leaning Data Filter
      </span>
    </Checkbox>
  </li>
  <li class="polarization-slider" class:hide={!$highlightPolarization}>
    <Slider value={$polarizationFilter}
            lockInMode={false}
            showLabel={false}
            min={polarizationDef[0]} 
            max={polarizationDef[1]}
            showHandleLabels={false}
            barOpacity={0.7}
            startColor={$polarizationScale(polarizationDef[0])}
            middleColor={$polarizationScale(0)}
            stopColor={$polarizationScale(polarizationDef[1])}
            showBorder={false}
            on:changed={(e) => $polarizationFilter = e.detail} />
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
    width: 100%;
    margin: 0.1rem 0 0.1rem -0.2rem;
    list-style-type: none;
  }

  li {
    position: relative;
  }

  li.polarization-slider {
    margin-bottom: 0.05rem;
  }

  span {
    display: inline-block;
    margin: 2% 0 0 0.5rem;
    font-family: var(--font-02);
    font-size: 0.8rem;
    color: var(--usa-blue);
  }

  .hide {
    visibility: hidden;
  }
</style>
