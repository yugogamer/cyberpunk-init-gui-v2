<script lang="ts">
    import Config from "../services/config";
    import type groupe from "../entity/groupes";
    import { createEventDispatcher } from "svelte";

    export let groupe: groupe;
    const dispatch = createEventDispatcher();

    async function remove() {
        const config = new Config();
        const query = {
            operationName: "Mutation",
            query: "mutation Mutation($groupeId: Int!) {  deleteGroupe(groupeId: $groupeId)}",
            variables: {
                groupeId: groupe.id,
            },
        };

        const response = await fetch(`${config.api_url}graphql`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(query),
        });

        const data = await response.json();
        dispatch("remove");
    }
</script>

<section class="container">
    <h1 class="title">{groupe.name}</h1>
    <a class="button is-primary" href="#/groupe/{groupe.id}">Go to groupe</a>
    <button class="button is-danger" on:click={remove}>Remove</button>
</section>
