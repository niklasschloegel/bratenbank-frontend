<template>
    <section id="app">
        <div class="hero is-primary">
            <div class="hero-body container">
                <h1 class="title">Bratenbank</h1>
            </div>
        </div>
        <div class="container">
            <div class="block">
                <nav class="navbar">
                    <div class="navbar-menu is-active">
                        <router-link to="/liste" class="navbar-item">Bratenliste</router-link>
                        <router-link to="/chat" class="navbar-item">Bratenchat</router-link>
                    </div>
                    <!--
                    <div class="navbar-end">
                      <div class="navbar-item">
                        <a href="/logout" class="navbar-item">Logout</a>
                      </div>
                    </div>
                      -->
                </nav>
            </div>

            <div class="columns">
                <div class="column is-three-quarters">
                    <div class="block">
                        <router-view/>
                    </div>
                </div>
                <div class="column">
                    <VegetarizitaetsRechner/>
                    <BratChat/>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from "vue";
    import VegetarizitaetsRechner from "@/components/VegetarizitaetsRechner.vue";
    import BratChat from "@/components/BratChat.vue";

    export default Vue.extend({
        name: "App",
        components: {
            VegetarizitaetsRechner,
            BratChat
        }
    });
</script>

<style>
</style>
