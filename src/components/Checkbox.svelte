<script>
  // custom checkbox
  export let id;
  export let checked = false;
</script>

<input type="checkbox"
       id="checkbox-{id}"
       class:checked
       on:click|stopPropagation />
<label for="checkbox-{id}" class="choice-entry-name">
  <slot></slot>
</label>

<style>
  label {
    display: inline-block;
    width: 100%;
    padding-left: 1.5rem;
    cursor: pointer;
    pointer-events: all;
  } 

  input[type="checkbox"] {
    display:none;
    pointer-events: all;
  }

  input[type="checkbox"] + label::before {
    display: block;
    width: 15px;
    height: 15px;
    margin-right: 0.4rem;
    border: 2px solid var(--usa-blue);
    border-radius: 3px;
    background-color: var(--bg);
    content: "";
    position: absolute;
    left: 0.5rem;
  }

  input[type="checkbox"].checked + label::before {
    box-shadow: inset 0px 0px 0px 3px var(--bg);
    background-color: var(--usa-blue);
  }
</style>
