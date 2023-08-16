<script lang="ts">
    import { onMount } from "svelte";
    import type Character from "../entity/character";
    import characterStore from "../services/character";
    import type { InputCharacter } from "../services/query";
    import config from "../services/config";

    export let character: Character;
    let updateCharacter: InputCharacter;
    let is_edit = false;
    let file = null;
    let imgSrc = "/assets/placeholder.jpg";
    if (character.assetUrl !== null && character.assetUrl !== "") {
        imgSrc = character.assetUrl;
    }

    async function remove() {
        characterStore.removeCharacter(character.id);
    }

    async function update() {
        characterStore.updateCharacter(character.id, updateCharacter);
        is_edit = false;
    }

    async function updateImage() {
        console.log(file);
        let filename = file.split("\\").pop();
        let input: any = document.querySelector('input[type="file"]');
        let url = `${config.api_url}character/asset/${character.id}/${filename}`;
        fetch(url, {
            method: "PUT",
            credentials: "include",
            body: input.files[0],
        })
            .then((response) => {
                console.log(response);
                if (response.status === 201) {
                    characterStore.updateCharacterList();
                }
                alert("image uploaded");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function duplicate() {}

    onMount(() => {
        updateCharacter = {
            name: character.name,
            baseRef: character.baseRef,
            modifier: character.modifier,
        };

        console.log(character);
    });
</script>

<section class="container">
    <h1 class="title">{character.name}</h1>
    {#if is_edit}
        <div class="field">
            <label class="label">Name</label>
            <div class="control">
                <input
                    class="input"
                    type="text"
                    placeholder="Name"
                    bind:value={updateCharacter.name}
                />
            </div>
            <label class="label">Base Ref</label>
            <div class="control">
                <input
                    class="input"
                    type="number"
                    placeholder="Base Ref"
                    bind:value={updateCharacter.baseRef}
                />
            </div>
            <label class="label">Modifier</label>
            <div class="control">
                <input
                    class="input"
                    type="number"
                    placeholder="Modifier"
                    bind:value={updateCharacter.modifier}
                />
                <label class="label">Images</label>
                <div class="control">
                    <input
                        class="input"
                        type="file"
                        placeholder="Images"
                        bind:value={file}
                    />
                </div>
                <section>
                    <button
                        class="button is-success"
                        on:click={() => (is_edit = false)}>cancel</button
                    >
                    <button class="button is-warning" on:click={update}
                        >update</button
                    >
                    <button class="button is-warning" on:click={updateImage}
                        >upload image</button
                    >
                    <button class="button is-danger" on:click={remove}
                        >delete</button
                    >
                    <button class="button is-warning" on:click={duplicate}
                        >Duplicate
                    </button>
                </section>
            </div>
        </div>
    {:else}
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
        </section>
        <button class="button is-warning" on:click={() => (is_edit = true)}
            >edit</button
        >
    {/if}
</section>
