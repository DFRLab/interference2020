<script>
  // the cookie banner
</script>

<div id="cookies-eu-banner">
  <div class="content">
    <p>This page wants to use cookies.</p>
    <button id="cookies-eu-accept">Accept</button>
    <button id="cookies-eu-reject">Reject</button>
    <a href="https://www.atlanticcouncil.org/privacy-policy/" target="_blank">Privacy</a>
  </div>
</div>

<style>
  #cookies-eu-banner {
    display: none;
    width: 100%;
    min-height: 10%;
    padding: 1rem;
    color: var(--bg);
    font-family: var(--font-02);
    font-size: 1rem;
    opacity: 0.95;
    background-color: var(--usa-lightred);
    position: fixed;
    z-index: 1000000;
    left: 0;
    bottom: 0;
  }

  .content {
    display: flex;
    align-items: baseline;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .content > p, button {
    margin-right: 1rem;
  }

  button {
    cursor: pointer;
  }

  #cookies-eu-banner button {
    padding: 0.1rem 0.3rem;
    font-size: 1rem;
    font-weight: normal;
    text-decoration: none;
    border: 1px solid var(--bg);
    border-radius: 2px;
    outline: none;
    position: relative;
  }

  button#cookies-eu-reject {
    color: var(--bg);
    background-color: var(--usa-lightred);
  }

  button#cookies-eu-accept {
    color: var(--usa-lightred);
    background-color: var(--bg);
  }

  a {
    display: block;
    justify-self: flex-end;
    font-size: 0.8rem;
    color: var(--bg);
  }
</style>
