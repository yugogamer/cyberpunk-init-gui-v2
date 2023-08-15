<script lang="ts">
    import type groupe from "../entity/groupes";
    import groupesStore from "../services/groupes";
    export let groupe: groupe;

    async function remove() {
        groupesStore.removeGroupe(groupe.id);
    }
</script>

<section class="container">
    <h1 class="title">{groupe.name}</h1>
    <a class="button is-primary" href="#/groupe/{groupe.id}">Go to groupe</a>
    <button class="button is-danger" on:click={remove}>Remove</button>
</section>
