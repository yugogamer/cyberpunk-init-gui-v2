<script>
  import Router from "svelte-spa-router";
  import { routes } from "./route";
</script>

<nav class="container">
  <section class="notification primary is-dark">
    <div class="columns">
      <div class="column is-1">
        <img src="/assets/logo.png" alt="logo" />
      </div>
      <div class="column">
        <h1 class="title">Cyberpunk Red</h1>
      </div>
      <div class="column">
        <a class="title" href="#/">Homes</a>
      </div>
      <div class="column">
        <a class="title" href="#/groupes">My groupes</a>
      </div>
      <div class="column">
        <a class="title" href="#/characters">My Characters</a>
      </div>
      <div class="column">
        <a class="title" href="#/armor">Armor Helper</a>
      </div>
    </div>
  </section>
</nav>

<body>
  <Router {routes} />
</body>

<style>
  :root {
    background-color: black;
    color: white;
  }
</style>
