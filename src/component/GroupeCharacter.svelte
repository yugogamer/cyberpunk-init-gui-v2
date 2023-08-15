<script lang="ts">
    import { onMount } from "svelte";
    import type Character from "../entity/character";
    import characterStore from "../services/character";
    import type { InputCharacter } from "../services/query";
    import config from "../services/config";

    export let character: Character;
    let imgSrc = "/assets/placeholder.jpg";
    if (character.assetUrl !== null && character.assetUrl !== "") {
        imgSrc = character.assetUrl;
    }

    async function remove() {
        characterStore.removeCharacter(character.id);
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
            <input
                id="switchExample"
                type="checkbox"
                name="switchExample"
                class="switch"
                checked={character.active}
            />
            <label for="switchExample">Switch example</label>
        </div>
    </section>
</section>
