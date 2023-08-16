<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import type Character from "../entity/character";
    import type Groupe from "../entity/groupes";
    import {
        assignCharacterToGroupe,
        changeStatusInGroupe,
        removeCharacterFromGroupe,
    } from "../services/query";

    export let character: Character;
    export let groupe: Groupe;
    let imgSrc = "/assets/placeholder.jpg";
    if (character.assetUrl !== null && character.assetUrl !== "") {
        imgSrc = character.assetUrl;
    }

    const dispatch = createEventDispatcher();

    async function updateInGroupe() {
        character.active = !character.active;
        changeStatusInGroupe(groupe.id, character.id, character.active)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function removeFromGroupe() {
        removeCharacterFromGroupe(groupe.id, character.id)
            .then((data) => {
                console.log(data);
                dispatch("update");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    onMount(() => {});
</script>

<section class="container">
    <h1 class="title">{character.name}</h1>
    <section class="columns">
        <img
            class="image is-128x128"
            src={imgSrc}
            width="10"
            height="10"
            alt="character portrait"
        />
        <div class="column">ref : {character.baseRef}</div>
        <div class="column">mod : {character.modifier}</div>

        <div class="field">
            <button class="button is-danger" on:click={removeFromGroupe}
                >remove from groupe</button
            >
            <input
                id="switchExample"
                type="checkbox"
                name="switchExample"
                class="switch"
                checked={character.active}
                on:change={updateInGroupe}
            />
            <label for="switchExample">Is Active</label>
        </div>
    </section>
</section>
