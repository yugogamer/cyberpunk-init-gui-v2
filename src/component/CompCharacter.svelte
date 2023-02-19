<script lang="ts">
    import type Character from "../entity/character";
    import { createEventDispatcher } from "svelte";
    import Config from "../services/config";

    const dispatch = createEventDispatcher();

    export let character: Character;
    let is_edit = false;

    async function updateCharacter() {
        let is_active = false;
        console.log(character.active);
        if (character.active == true) {
            is_active = true;
        }
        const config = new Config();
        const query = {
            operationName: "UpdateCharacter",
            query: "mutation UpdateCharacter($characterId: Int!, $character: UpdateCharacter!) {  updateCharacter(characterId: $characterId, character: $character) {    id  }}",
            variables: {
                characterId: character.id,
                character: {
                    name: character.name,
                    baseRef: character.baseRef,
                    modifier: character.modifier,
                    active: is_active,
                },
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
        dispatch("update", character);
        is_edit = false;
    }

    async function deleteCharacter() {
        const config = new Config();
        const query = {
            operationName: "Mutation",
            query: "mutation Mutation($characterId: Int!) {  deleteCharacter(characterId: $characterId)}",
            variables: {
                characterId: character.id,
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

        dispatch("delete", character);
        is_edit = false;
    }
</script>

<section class="section">
    {#if is_edit}
        <div class="field">
            <label class="label">Name</label>
            <div class="control">
                <input
                    class="input"
                    type="text"
                    placeholder="Name"
                    bind:value={character.name}
                />
            </div>
            <label class="label">Base Ref</label>
            <div class="control">
                <input
                    class="input"
                    type="number"
                    placeholder="Base Ref"
                    bind:value={character.baseRef}
                />
            </div>
            <label class="label">Modifier</label>
            <div class="control">
                <input
                    class="input"
                    type="number"
                    placeholder="Modifier"
                    bind:value={character.modifier}
                />
            </div>
            <label class="checkbox">
                <input type="checkbox" bind:checked={character.active} />
                Active
            </label>
            <section>
                <button
                    class="button is-success"
                    on:click={() => (is_edit = false)}>cancel</button
                >
                <button class="button is-warning" on:click={updateCharacter}
                    >update</button
                >
                <button class="button is-danger" on:click={deleteCharacter}
                    >delete</button
                >
            </section>
        </div>
    {:else}
        <h3 class="title">{character.name}</h3>
        <section class="columns">
            <div class="column">ref : {character.baseRef}</div>
            <div class="column">mod : {character.modifier}</div>
            <div class="column">active : {character.active}</div>
        </section>
        <button class="button is-warning" on:click={() => (is_edit = true)}
            >edit</button
        >
    {/if}
</section>
