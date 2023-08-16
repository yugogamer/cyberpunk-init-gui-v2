<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import type Character from "../entity/character";
    import characterStore from "../services/character";
    import CompCharacterList from "../component/CompCharacterList.svelte";
    import type { InputCharacter } from "../services/query";

    let characters: Character[] = [];
    let newCharacter: InputCharacter = {
        name: "",
        baseRef: 0,
        modifier: 0,
    };
    const unsubscribe = characterStore.subscribe((value) => {
        characters = value;
    });

    function create() {
        characterStore.addCharacter(newCharacter);
    }

    onMount(() => {
        if (characters.length === 0) {
            characterStore.updateCharacterList();
        }
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<section class="container">
    {#each characters as character}
        <CompCharacterList {character} />
    {/each}
    <h1 class="title">Create character</h1>
    <div class="field">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">Name</label>
        <div class="control">
            <input
                class="input"
                type="text"
                placeholder="Name"
                bind:value={newCharacter.name}
            />
        </div>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">Base Ref</label>
        <div class="control">
            <input
                class="input"
                type="number"
                placeholder="Base Ref"
                bind:value={newCharacter.baseRef}
            />
        </div>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">Modifier</label>
        <div class="control">
            <input
                class="input"
                type="number"
                placeholder="Modifier"
                bind:value={newCharacter.modifier}
            />
        </div>
        <section>
            <button class="button is-warning" on:click={create}>create</button>
        </section>
    </div>
</section>
