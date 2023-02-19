<script lang="ts">
    import type Groupe from "../entity/groupes";
    import CompGroupe from "../component/CompGroupe.svelte";
    import { createGroupe, getGroups } from "../services/query";
    import { onMount } from "svelte";

    let groupes: Groupe[] = [];
    let inputName: string = "";

    onMount(async () => {
        await updateGroupes();
    });

    function handleEvent(event: any) {
        updateGroupes().then(() => {
            console.log("updated");
        });
    }

    async function updateGroupes() {
        getGroups()
            .then((data) => {
                groupes = data.data.getGroupes;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function createGroupeFunction() {
        createGroupe(inputName).then((data) => {
            updateGroupes().then(() => {});
        });

        updateGroupes().then(() => {});
        inputName = "";
    }
</script>

<section class="container">
    <h1 class="title">All your groupes</h1>
    <section class="notification is-primary">
        {#each groupes as groupe}
            <CompGroupe {groupe} on:remove={handleEvent} />
        {/each}
    </section>
    <section class="notification is-primary">
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
</section>
