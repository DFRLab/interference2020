<script>
  // dynamic content placed above the visual
  import {
    disinformantNationFilter,
    contextData,
    sourceFilter,
    attributionScoreFilter,
    selectAllFilters,
    highlightPolarization,
    highlightCib } from '../stores/filters';
  import { format, timeFormat } from 'd3';
  import { drawWrapper } from '../stores/elements';
  import { copytooltipable } from '../actions/copytooltipable';
  import { scrollTo } from '../utils/misc';

  export let data = [];

  const commaFormat = format(',');
  const tf = timeFormat('%B %d, %Y');

  function handleApplyFilter(id) {
    selectAllFilters();
    contextData.unselectAll();
    $highlightPolarization = false;
    $highlightCib = false;
    switch (id) {
      case 0:
        disinformantNationFilter.selectOne('China');
        contextData.selectOne('corona');
        break;
      case 1:
        sourceFilter.selectOne('Facebook');
        $highlightCib = true;
        break;
      case 2:
        $attributionScoreFilter = [$attributionScoreFilter[0], 6];
        break;
      case -1: break;
    }
    $drawWrapper.scrollIntoView({behavior: 'smooth'});
  }
</script>

{#if (data.length > 0)}
  <section class="content no-upper-margin">
    <input id="collapsible-status-quo" class="toggle" type="checkbox">
    <label for="collapsible-status-quo" class="lbl-toggle top">Overview</label>
    <div class="collapsible-content">
      <p>
        This project builds public attribution standards, provides an independent and reliable record of foreign interference in the 2020 election, serves as a resource for stakeholders about the evolving threat, and helps to build public resilience against future foreign interference efforts and disinformation. It has been created in service of the <a href="https://www.atlanticcouncil.org/programs/digital-forensic-research-lab/">DFRLab's</a> mission to identity, expose, and explain disinformation and to promote objective fact as the basis for governance worldwide.
      </p>
      <p>
        The FIAT dataset contains <em>{data.length} allegations</em> of foreign interference originating from <em>{$disinformantNationFilter.length} nations</em>. Stories regarding these claims have received a cumulative <em>{commaFormat(data.map((d) => d.smiTotal).filter((d) => !isNaN(d)).reduce((acc, cur) => acc + cur))} social media shares and engagements</em>. The dataset was last updated on <em>{tf(data.map((d) => d.timestamp).sort((a, b) => a > b ? 1 : -1).slice(-1)[0])}</em>.
      </p>
      <p>
        This tool will be regularly updated as further allegations or attributions of foreign interference in the 2020 U.S. election are made public. If you have questions regarding the tool or would like to submit a case for consideration, please <a href="mailto:DFRLab@atlanticcouncil.org">contact the DFRLab</a>.
      </p>
    </div>
    <input id="collapsible-how-to" class="toggle" type="checkbox">
    <label for="collapsible-how-to" class="lbl-toggle top">How To Use This Tool</label>
    <div class="collapsible-content">
      <p>
        FIAT consists of six elements that work together in order to tell the complete story of foreign interference allegations in the 2020 U.S. elections.
      </p>
      <p>
        <em>Filters</em> enable users to adjust the visibility of cases by <span class="pseudolink copy-tooltip" on:click={() => scrollTo('attribution-score', 'collapsible-methodology')} use:copytooltipable={{content: 'The Attribution Score is a framework of eighteen binary statements (true or false) intended to assess the credibility, objectivity, evidence, and transparency of a given case.'}}>Attribution Score</span>, <span class="pseudolink copy-tooltip" on:click={() => scrollTo('source', 'collapsible-codebook')} use:copytooltipable={{content: 'Disinformant Nation is the nation from which the case allegedly originated. This does not necessarily denote that the activity was associated with a government.'}}>Disinformant Nation</span>, <span class="pseudolink copy-tooltip" on:click={() => scrollTo('platform', 'collapsible-codebook')} use:copytooltipable={{content: 'Platform(s) on which the case allegedly took place, divided between the open web, social media platforms, messaging platforms, and other platforms like email and forum boards.'}}>Platform</span>, <span class="pseudolink copy-tooltip" on:click={() => scrollTo('method', 'collapsible-codebook')} use:copytooltipable={{content: 'Method(s) involved in both the creation and amplification of content related to the case. Sockpuppets are one method; hacking by means of data exfiltration is another.'}}>Method</span>, <span class="pseudolink copy-tooltip" on:click={() => scrollTo('source', 'collapsible-codebook')} use:copytooltipable={{content: 'Source describes the individual or entity that originated a foreign interference claim.'}}>Source</span>, and <span class="pseudolink copy-tooltip" on:click={() => scrollTo('source', 'collapsible-codebook')} use:copytooltipable={{content: 'Source Category is the broad classification (e.g. Government, Technology Company) of the Source of a given case.'}}>Source Category</span>. Free text search is also supported. This view also supports the addition of contextual datasets.
      </p>
      <p>
        <em>Case View</em> shows a series of interactable circles of various sizes and heights, each of which represents one case. The transparency of the circles corresponds to their Attribution Score. The radii of the circles correspond to the <span class="pseudolink copy-tooltip" on:click={() => scrollTo('attribution-impact', 'collapsible-methodology')} use:copytooltipable={{content: 'Attribution Impact measures the spread of case-related articles and content over the seven days following a foreign interference allegation. It is a sum of Facebook engagements, Twitter shares, and Reddit engagements.'}}>Attribution Impact</span> of the case, measured on a square root scale with a built-in minimum size for cases without Attribution Impact. The height of the circles also corresponds to the Attribution Impact, measured on a logarithmic scale. Therefore, difference in both the size and height of two given cases indicates exponential variation in their Attribution Impact. The individual thickness of the three surrounding rings represents the relative contribution of Facebook, Twitter and Reddit shares and engagements scaled by total Attribution Impact. This allows for a direct within case comparison. Cases are ordered chronologically by <span class="pseudolink copy-tooltip" on:click={() => scrollTo('activity-attribution-date', 'collapsible-codebook')} use:copytooltipable={{content: 'Date of Attribution indicates the publication date of the attribution upon which the case is based.'}}>Date of Attribution</span>, from left to right. Cases are attached to a tail that indicates one or more Disinformant Nations. Two or more cases can be selected to compare them in the <em>Dataset View</em>.
      </p>
      <p>
        <em>Case Tooltips</em> are accessible by hovering over a given case. This enables users to see the <span class="pseudolink copy-tooltip" on:click={() => scrollTo('source', 'collapsible-codebook')} use:copytooltipable={{content: 'Attribution Type indicates how strongly a case is associated with a particular political actor. It denotes the difference between a state-directed military operation versus the efforts of a political troll farm.'}}>Attribution Type</span>, Date of Attribution, the <span class="pseudolink copy-tooltip" on:click={() => scrollTo('activity-attribution-date', 'collapsible-codebook')} use:copytooltipable={{content: 'Date(s) of Activity capture the earliest and latest activity alleged in a given case. Not always available.'}}>Date(s) of Activity</span>, and a <span class="pseudolink copy-tooltip" on:click={() => scrollTo('description-link', 'collapsible-codebook')} use:copytooltipable={{content: 'Narrative description of a given case, including Source, Disinformation, and Disinformant Nation. Describes the number and reach (when known) of digital assets employed.'}}>Description</span> of a given case. Users can also see a breakdown of a case’s Attribution Score by its four subsections (Credibility, Objectivity, Evidence, and Transparency); clicking on the question mark on the right-hand corner of this view also expands the full scorecard. Platforms, Methods, Source, Source Category, and <span class="pseudolink copy-tooltip" on:click={() => scrollTo('description-link', 'collapsible-codebook')} use:copytooltipable={{content: 'Link of Attribution links to the source claim upon which assessments are based. An archived link is available in the full downloadable dataset.'}}>Link of Attribution</span> are also presented in the tooltip and can be clicked to auto-filter the <em>Case View</em> accordingly.  
      </p>
      <p>
        <em>Timeline View</em> enables cases to be ordered chronologically from left to right. Noteworthy U.S. events in the U.S. 2020 election cycle are plotted on the timeline for context and reference. Additional timeline elements can be introduced with the Context Datasets filter. By clicking and dragging on the timeline, users can filter their view to a particular date range. They can return to the default view by clicking "Reset time scale" on the left-hand side of the timeline. 
      </p>
      <p>
        <em>Map View</em> shows a Mercator projection of the Earth. Cases are plotted on the map by means of tails connected to particular Disinformant Nations: the more lines a particular country has originating from it, the more it has been implicated in allegations of foreign interference. By hovering over a particular country, users can see a density plot of attributions over time (if n > 5), as well as breakdowns of Platform, Method, Source, and Source Category. Each of these can be auto-filtered together with the selected country.
      </p>
      <p>
        <em>Dataset View</em> presents a simplified spreadsheet view of the FIAT dataset. Cases are affected by all applied filters. By clicking on one or more cases in the Case View, users can "pin" them to the top of the Dataset View for easy comparison. The <em>Dataset View</em> for easy comparison. The <a href="https://github.com/DFRLab/Interference2020-Data">full dataset</a> can also be downloaded from this view. 
      </p>
    </div>
  </section>
  <section class="content">
    <p>
      FIAT enables users to filter and examine foreign interference allegations in a multitude of ways. As you get started, consider filtering by: 
    </p>
    <ul class="filter-list">
      <li on:click|self={() => handleApplyFilter(0)}>China-Related Allegations as Compared to U.S. COVID-19 Cases</li>
      <li on:click|self={() => handleApplyFilter(1)}>All Foreign Interference Allegations Made by Facebook with CIB Data</li>
      <li on:click|self={() => handleApplyFilter(2)}>All Foreign Interference Allegations That Lack Significant Evidence</li>
    </ul>
    <!-- <p>
      Or just explore the full tool <span class="pseudolink" on:click={() => handleApplyFilter(-1)}>below</span>. 
    </p> -->
  </section>
{/if}

<style>
</style>
