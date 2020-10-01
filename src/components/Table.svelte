<script>
  // the data table
  import { sortConsistently } from '../utils/misc';
  import { draggable } from '../actions/draggable';
  import { selected } from '../stores/eventSelections';
  import { columns as inputColumns} from '../inputs/table';

  export let timePoints = [];

  let columns = [...inputColumns];
  let rows;

  let searchString = '';

  function getData(timePoints) {
    resetSorters();
    rows = [...timePoints].filter((d) => d.show);
  }

  function sortRows(property, direction) {
    rows.sort((a, b) => direction * sortConsistently(a, b, property, 'id'));
  }

  function resetSorters() {
    columns = columns.map((d) => ({...d, sorted: 'none'}));
  }

  function handleSorterClick(property) {
    columns.forEach((d) => {
      if (d.property !== property) d.sorted = 'none';
    })
    const column = columns.find((d) => d.property === property);
    if (column.sorted === 'none') {
      column.sorted = 'descending';
      sortRows(property, -1);
    } else if (column.sorted === 'descending') {
      column.sorted = 'ascending';
      sortRows(property, 1);
    } else if (column.sorted === 'ascending') {
      column.sorted = 'none';
      getData(timePoints);
    }
    columns = columns;
  }

  function getSortedSelectedRows(ids) {
    const arr = [];
    ids.reverse().forEach((id) => {
      arr.push(timePoints.find((d) => d.id === id));
    });
    return(arr);
  }

  function moveUp(ids) {
    resetSorters();
    if (ids.length > 0) {
      rows = [...getSortedSelectedRows(ids), ...rows.filter((d) => !ids.includes(d.id))];
    }
  }

  $: getData(timePoints);

  $: if ($selected && timePoints) moveUp($selected.map((d) => d.id));
</script>

<div id="table"
     class="table-element"
     on:click|stopPropagation>
  <div class="table-header">
    <a href="https://github.com/DFRLab/Interference2020-Data" target="_blank">Download full dataset</a>
  </div>
  <div class="inner-table-wrapper" use:draggable>
    <table cellspacing="0" cellpadding="0">
      <thead class="disable-select">
        <tr>
          {#each columns as column (column.property)}
            <th>
              {column.name}
              {#if (column.sortable)}
                <svg viewBox="0 0 15 10"
                     width="12"
                     height="8"
                     class={column.sorted}
                     on:click|stopPropagation={() => handleSorterClick(column.property)}>
                  <path d="M0 0L15 0L7.5 10Z"></path>
                </svg>
              {/if}
            </th>
          {/each}
        </tr>
      </thead>
      <tbody on:mousedown|stopPropagation>
        {#each rows.filter((d) => d.search.indexOf(searchString.toUpperCase()) > -1) as row, i (row.id)}
          <tr class:darker={1 - (i % 2) === 0}
              class:selected={$selected.map((d) => d.id).includes(row.id)}>
            {#each columns as column (column.property)}
              <td class={column.classes} style={column.minWidth ? `min-width: ${column.minWidth};`: ''}>
                {#if (row[column.property] === undefined || row[column.property] === null)}
                  {''}
                {:else if (column.format)}
                  {column.format(row[column.property])}
                {:else if (column.hyperlink)}
                  <a href={row[column.property]} target="_blank">Link</a>
                {:else}
                  {row[column.property]}
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .table-element {
    display: block;
    width : 90%;
    margin: 0 auto;
    position: relative;
  }
  
  .table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 1.7rem;
    margin: 0.4rem 0;
    padding: 0;
    font-family: var(--font-02);
    font-size: 0.8rem;
  }

  .inner-table-wrapper {
    width: 100%;
    height: 600px;
    max-height: 70vh;
    overflow-x: scroll;
    border: 1px solid var(--usa-blue);
  }

  .inner-table-wrapper::-webkit-scrollbar {
    -webkit-appearance: none;
  }

  .inner-table-wrapper::-webkit-scrollbar:horizontal {
    height: 7px;
  }

  .inner-table-wrapper::-webkit-scrollbar:vertical {
    width: 7px;
  }

  .inner-table-wrapper::-webkit-scrollbar-thumb {
    background-color:var(--usa-lightblue);
  }

  table {
    width: 100%;
    min-width: 100%;
    font-family: var(--font-02);
    color: var(--text-black);
    border: none;
    position: relative;
  }

  th, td {
    padding: 0.2rem 0.4rem;
  }

  th {
    font-size: 0.9rem;
    text-align: left;
    vertical-align: top;
    background-color: var(--usa-lightblue);
    white-space: nowrap;
    cursor: grab;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 10000;
  }

  th svg {
    margin-bottom: 0.05rem;
    stroke: none;
    fill: var(--text-black);
    transition: transform 400ms ease;
    cursor: pointer;
  }

  th svg.none {
    transform: rotate(-90deg);
  }

  th svg.descending {
    transform: rotate(360deg);
  }

  th svg.ascending {
    transform: rotate(-540deg);
  }

  tbody {
    width: 100%;
  }

  tr {
    background-color: var(--bg);
  }

  tr.selected {
    background-color: var(--usa-lightblue);
  }

  td {
    font-size: 0.8rem;
    line-height: 1.5;
    vertical-align: top;
    position: relative;
  }

  .score-bar {
    height: 0.7rem;
    margin: auto 0;
    background-color: var(--usa-lightblue);
    border: none;
    border-radius: 3px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0.4rem;
  }

  .left {
    text-align: left;
  }

  .right {
    text-align: right;
  }

  .darker {
    background-color: var(--dfrlab-lightlightgray);
  }
</style>
