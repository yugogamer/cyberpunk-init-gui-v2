<script lang="ts">
    import Config from "../services/config";
    import { onMount } from "svelte";

    let username: string = "";
    let password: string = "";

    let newUsername: string = "";
    let newEmail: string = "";
    let newPassword: string = "";

    function login() {
        let input = {
            email: username,
            password: password,
        };

        const config = new Config();

        fetch(`${config.api_url}account/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(input),
        })
            .then((response) => {
                console.log("Success login");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    function register() {
        let input = {
            email: newEmail,
            username: newUsername,
            password: newPassword,
        };

        const config = new Config();

        fetch(`${config.api_url}account/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(input),
        })
            .then((response) => {
                alert("Success register");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    onMount(async () => {
        console.log(document.cookie);
        if (document.cookie.includes("session")) {
            window.location.href = "#/groupes";
        }
    });
</script>

<div class="container">
    <h1 class="title">Login</h1>
    <field class="field">
        <label class="label text">Email</label>
        <input
            type="text"
            class="input dark"
            placeholder="Email"
            bind:value={username}
        />
        <label class="label text">Password</label>
        <input
            type="password"
            class="input dark"
            placeholder="Password"
            bind:value={password}
        />
        <button class="button is-primary" on:click={login}>Login</button>
    </field>
    <h1 class="title">Register</h1>
    <field class="field">
        <label class="label text">Username</label>
        <input
            type="text"
            class="input dark"
            placeholder="Username"
            bind:value={newUsername}
        />
        <label class="label text">Email</label>
        <input
            type="email"
            class="input dark"
            placeholder="Email"
            bind:value={newEmail}
        />
        <label class="label text">Password</label>
        <input
            type="password"
            class="input dark"
            placeholder="Password"
            bind:value={newPassword}
        />
        <button class="button is-primary" on:click={register}>Register</button>
    </field>
</div>
