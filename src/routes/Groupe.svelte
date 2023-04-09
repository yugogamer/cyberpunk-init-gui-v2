<script lang="ts">
    import Character from "../entity/character";
    import CompCharacter from "../component/CompCharacter.svelte";
    import {
        createCharacters,
        getCharacters,
        type InputCharacter,
    } from "../services/query";
    import type groupe from "../entity/groupes";
    import { onMount } from "svelte";

    export let params: { id: number } = { id: -1 };
    let characters: Character[] = [];
    let newCharacterName = new Character(0, "", 0, 0, false);
    let create = false;
    const groupe: groupe = {
        id: -1,
        name: "Loading...",
    };

    async function updateAll() {
        getCharacters(params.id)
            .then((data) => {
                groupe.id = data.data.getGroupe.id;
                groupe.name = data.data.getGroupe.name;
                characters = data.data.getGroupe.characters;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function createCharacter() {
        let is_active = false;
        if (newCharacterName.active == true) {
            is_active = true;
        }
        const newCharacter: InputCharacter = {
            groupeId: Number(params.id),
            name: newCharacterName.name,
            baseRef: newCharacterName.baseRef,
            modifier: newCharacterName.modifier,
            active: is_active,
        };

        createCharacters(newCharacter).then((data) => {
            updateAll().then(() => {
                newCharacterName = new Character(0, "", 0, 0, false);
            });
        });
    }

    onMount(() => {
        updateAll().then(() => {
            console.log("updateAll");
        });
    });

    async function handleEvent(event: CustomEvent) {
        updateAll();
    }
</script>

<section class="container">
    <h1 class="title">Name</h1>
    <section>id for bot usage : {params.id}</section>
    <section class="notification is-info">
        <h1 class="title">Characters</h1>
        <section>
            {#each characters as character}
                <CompCharacter
                    {character}
                    groupeId={params.id}
                    on:delete={handleEvent}
                />
            {/each}
        </section>
        {#if create}
            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        placeholder="Name"
                        bind:value={newCharacterName.name}
                    />
                </div>
                <label class="label">Base Ref</label>
                <div class="control">
                    <input
                        class="input"
                        type="number"
                        placeholder="Base Ref"
                        bind:value={newCharacterName.baseRef}
                    />
                </div>
                <label class="label">Modifier</label>
                <div class="control">
                    <input
                        class="input"
                        type="number"
                        placeholder="Modifier"
                        bind:value={newCharacterName.modifier}
                    />
                </div>
                <label class="checkbox">
                    <input
                        type="checkbox"
                        bind:checked={newCharacterName.active}
                    />
                    Active
                </label>
                <div class="control">
                    <button class="button" on:click={createCharacter}>
                        Create
                    </button>
                    <button class="button" on:click={() => (create = false)}>
                        Cancel</button
                    >
                </div>
            </div>
        {:else}
            <button class="button" on:click={() => (create = true)}>
                Create Character</button
            >
        {/if}
    </section>
</section>
