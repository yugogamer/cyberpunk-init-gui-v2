<script lang="ts">
    import type Groupe from "../entity/groupes";
    import CompGroupe from "../component/CompGroupe.svelte";
    import { onDestroy, onMount } from "svelte";
    import groupesStore from "../services/groupes";
    import { getInvitations } from "../services/query";
    import CompInvitation from "../component/CompInvitation.svelte";

    let groupes: Groupe[] = [];
    let invitation: Groupe[] = [];
    const unsubscribe = groupesStore.subscribe((value) => {
        groupes = value;
    });
    let inputName: string = "";

    onMount(() => {
        if (groupes.length === 0) {
            groupesStore.updateGroupesList();
        }
        getInvitations()
            .then((data) => {
                invitation = data;
            })
            .catch((err) => {
                console.log(err);
            });
    });

    function handleEvent(event: any) {
        groupesStore.updateGroupesList();
    }

    async function createGroupeFunction() {
        groupesStore.addGroupe(inputName);
        inputName = "";
    }

    onDestroy(() => {
        unsubscribe();
    });
</script>

<section class="container">
    <h1 class="title">All your groupes</h1>
    <section class="notification is-info">
        {#each groupes as groupe}
            <CompGroupe {groupe} on:remove={handleEvent} />
        {/each}
    </section>
    <section class="notification is-info">
        <div class="columns">
            <div class="column">
                <input
                    class="input"
                    type="text"
                    placeholder="Name"
                    bind:value={inputName}
                />
            </div>
            <div class="column">
                <button
                    class="button is-primary"
                    on:click={createGroupeFunction}
                >
                    Create groupe
                </button>
            </div>
        </div>
    </section>

    <h1 class="title">Invitation</h1>
    <section class="notification is-info">
        {#each invitation as groupe}
            <CompInvitation {groupe} />
        {/each}
    </section>
</section>
