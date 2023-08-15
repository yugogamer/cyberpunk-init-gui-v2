<script lang="ts">
    import Character from "../entity/character";
    import CompCharacter from "../component/CompCharacter.svelte";
    import {
        assignCharacterToGroupe,
        createCharacters,
        getCharacters,
        type InputCharacter,
    } from "../services/query";
    import type groupe from "../entity/groupes";
    import { onDestroy, onMount } from "svelte";
    import Characters from "./Characters.svelte";
    import characterStore from "../services/character";
    import { bind } from "svelte/internal";
    export let params: { id: number } = { id: -1 };

    let characters: Character[] = [];
    let myCharacter: Character[] = [];
    let selected: number;

    const unsubscribe = characterStore.subscribe((value) => {
        myCharacter = value;
    });

    let groupe: groupe = {
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

    async function addToGroupe() {
        assignCharacterToGroupe(groupe.id, selected)
            .then((data) => {
                console.log(data);
                updateAll().then(() => {
                    console.log("updateAll");
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    onMount(() => {
        if (myCharacter.length === 0) {
            characterStore.updateCharacterList();
        }
        updateAll().then(() => {
            console.log("updateAll");
        });
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<section class="container">
    <h1 class="title">Name</h1>
    <section>id for bot usage : {params.id}</section>
    <section class="notification is-info">
        <h1 class="title">{groupe.name}</h1>
        <p>add a character</p>

        <div class="select">
            <select bind:value={selected}>
                {#each myCharacter as character}
                    <option value={character.id}>{character.name}</option>
                {/each}
            </select>
        </div>
        <button class="button is-primary" on:click={addToGroupe}>Add</button>

        <h1 class="title">Characters</h1>
        <section>
            {#each characters as character}
                <CompCharacter {groupe} {character} />
            {/each}
        </section>
    </section>
</section>
