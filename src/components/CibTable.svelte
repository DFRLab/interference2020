<script>
  import {
    cibTableFields,
    cibColumnHeaders } from '../inputs/cib';

  import { format } from 'd3';

  import Icon from 'svelte-awesome';
  import { facebook, instagram } from 'svelte-awesome/icons';
  
  export let data;

  const commaFormat = format(',');
  const iconData = {
    facebook,
    instagram
  };
</script>

<div class="cib-table-wrapper">
  <table>
    <thead>
      <tr>
        {#each cibColumnHeaders as { id, name } (id)}
          <td>{name}</td>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each cibTableFields as field (field.id)}
        <tr>
          {#each cibColumnHeaders as { id, type } (id)}
            <td>
              {#if (type === 'platformName')}
                <Icon data={iconData[field[type].toLowerCase()]}
                      scale="0.9"
                      label={field[type]} />
              {:else if (type === 'fieldName')}
                <span>{field[type]}</span>
              {:else if (data[field[type]] !== undefined)}
                <span class="right-align">{commaFormat(data[field[type]])}</span>
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
  <div class="budget-and-events">
    {#if (data.budgetTotalUsd && data.budgetTotalUsd > 0)}
      <p>Facebook advertising expenditures: $ {commaFormat(data.budgetTotalUsd)}.</p>
    {/if}
  </div>
</div>

<style>
  .cib-table-wrapper {
    display: flex;
    width: 100%;
    margin-top: 0.3rem;
  }

  table {
    flex: 1;
    max-width: 60%;
    font-size: 0.8rem;
    color: var(--text-black);
    border-collapse: collapse;
  }

  thead {
    font-size: 0.7rem;
  }

  thead td {
    border-bottom: 1px solid gray;
  }

  td {
    min-width: 30px;
    padding: 0.1rem 0.2rem;
    vertical-align: middle;
  }

  td span {
    display: inline-block;
    width: 100%;
    margin-bottom: 0.2rem;
  }

  td span.right-align {
    text-align: right;
  }

  .budget-and-events {
    padding: 1.1rem 0 0 1rem;
  }

  .budget-and-events p {
    font-size: 0.7rem;
  }
</style>
