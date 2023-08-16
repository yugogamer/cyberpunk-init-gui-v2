<script lang="ts">
    import type Groupe from "../entity/groupes";
    import { acceptInvitation, declineInvitation } from "../services/query";

    export let groupe: Groupe;

    async function accept() {
        acceptInvitation(groupe.id)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function decline() {
        declineInvitation(groupe.id)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
</script>

<section class="container">
    <h1 class="title">{groupe.name}</h1>
    <button on:click={accept}>accept</button>
    <button on:click={decline}>decline</button>
</section>
