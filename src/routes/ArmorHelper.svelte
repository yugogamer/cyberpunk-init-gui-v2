<script lang="ts">
    let hp: number = 0;
    let armor: number = 0;
    let skinWeaves: number = 0;
    let subdermalArmor: number = 0;

    let currentHp: number = 0;
    let currentArmor: number = 0;
    let currentSkinWeaves: number = 0;
    let currentSubdermalArmor: number = 0;

    let dommage: number = 0;
    let isPerforation: boolean = false;

    function takeDommage() {
        let currentDommage = dommage;
        if (currentDommage > 0 && currentArmor > 0) {
            currentDommage -= currentArmor;
            if (isPerforation) {
                currentArmor -= 2;
            } else {
                currentArmor -= 1;
            }
        }
        if (currentDommage > 0 && currentSkinWeaves > 0) {
            currentDommage -= currentSkinWeaves;
            if (isPerforation) {
                currentSkinWeaves -= 2;
            } else {
                currentSkinWeaves -= 1;
            }
        }
        if (currentDommage > 0 && currentSubdermalArmor > 0) {
            currentDommage -= currentSubdermalArmor;
            if (isPerforation) {
                currentSubdermalArmor -= 2;
            } else {
                currentSubdermalArmor -= 1;
            }
        }
        if (currentDommage > 0 && currentHp > 0) {
            currentHp -= currentDommage;
        }

        dommage = 0;
    }
</script>

<div class="notification is-info">
    <h1 class="title">Armor Helper</h1>
    <section class="section">
        <h2 class="title">Total</h2>
        <p>HP : <input type="number" bind:value={hp} /></p>
        <p>Armor: <input type="number" bind:value={armor} /></p>
        <p>Skin weaves: <input type="number" bind:value={skinWeaves} /></p>
        <p>
            Subdermal Armor: <input type="number" bind:value={subdermalArmor} />
        </p>
    </section>
    <section class="section">
        <h2 class="title">Current</h2>
        <p>HP : <input type="number" bind:value={currentHp} /></p>
        <p>Armor: <input type="number" bind:value={currentArmor} /></p>
        <p>
            Skin weaves: <input type="number" bind:value={currentSkinWeaves} />
        </p>
        <p>
            Subdermal Armor: <input
                type="number"
                bind:value={currentSubdermalArmor}
            />
        </p>
    </section>
    <section class="section">
        <h2 class="title">Result</h2>
        <p>HP : {currentHp}/{hp}</p>
        <p>Armor: {currentArmor}/{armor}</p>
        <p>Skin weaves: {currentSkinWeaves}/{skinWeaves}</p>
        <p>Subdermal Armor: {currentSubdermalArmor}/{subdermalArmor}</p>
    </section>
    <section>
        <h2 class="title">Damage</h2>
        <input class="" type="number" bind:value={dommage} />
        <input type="checkbox" bind:checked={isPerforation} /> is perforation
        <button class="button" on:click={takeDommage}>Take dommage</button>
    </section>
</div>
