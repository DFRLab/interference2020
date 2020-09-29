<script>
  // score questions and answers used on the case tooltips
  import { uniqBy } from 'lodash';
  import { questions, scores, maxScores } from '../inputs/scores';

  export let timePoint;

  const ans = (int) => int === 1 ? true : false;
</script>

<div class="score-questions">
  {#each scores as s}
    <h4>{s.scoreName}: {timePoint[s.score]}/{maxScores[s.score]}</h4>
    <ul>
      {#each questions.filter((d) => d.score === s.score) as q (q.id)}
        <li>
          <input type="checkbox" checked={ans(timePoint[q.column])} />
          <span class="checkmark"></span>
          <p>{q.text}</p>
        </li>
      {/each}
    </ul>
  {/each}
</div>

<style>
  ul {
    margin: 0.3rem 0;
    list-style-type: none;
  }

  h4 {
    margin: 1rem 0 0 0;
    font-size: 0.8rem;
    font-weight: bold;
    color: var(--text-black);
  }

  li {
    display: block;
    margin: 0.3rem 0;
    padding-left: 20px;
    position: relative;
  }

  li p {
    font-family: var(--font-02);
    font-size: 0.8rem;
    line-height: 1.5;
    color: var(--text-black);
  }

  li input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: 5px;
    left: 0;
    height: 15px;
    width: 15px;
    border: none;
    border-radius: 2px;
    background-color: var(--bg);
  }

  .checkmark:after {
    content: '';
    display: none;
    position: absolute;
  }

  li input:checked ~ .checkmark:after {
    display: block;
  }

  li .checkmark:after {
    left: 5px;
    top: 2px;
    width: 3px;
    height: 7px;
    border: solid var(--usa-blue);
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
</style>
