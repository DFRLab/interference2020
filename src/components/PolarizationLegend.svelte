<script>
  import { categories } from '../inputs/polarization';
</script>

<div class="pol-legend">
  <p>Polarization:</p>
  <ul>
    {#each categories as category (category)}
      <li>
        <div class="pol-legend-field pol-{category.id}"></div>
        <p>{category.name}</p>
      </li>
    {/each}
  </ul>
</div>

<style>
  .pol-legend {
    display: flex;
    align-items: center;
    font-family: var(--font-02);
    color: var(--dfrlab-gray);
  }

  .pol-legend p {
    margin-right: 0.7rem;
    font-size: 0.7rem;
  }

  .pol-legend ul {
    display: flex;
    align-items: center;
    height: 100%;
    list-style-type: none;
  }

  .pol-legend ul li {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .pol-legend ul li p {
    font-size: 0.6rem;
  }

  .pol-legend-field {
    width: 0.5rem;
    height: 0.5rem;
    margin-right: 0.2rem;
  }
</style>
