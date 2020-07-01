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
            <a href="/home" class="navbar-item">Bratenliste</a>
            <a href="/welt" class="navbar-item">Bratenwelt</a>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <a href="/logout" class="navbar-item">Logout</a>
            </div>
          </div>
        </nav>
      </div>

      <div class="columns">
        <div class="column is-three-quarters">
          <div class="block">
            <!--
            <BratenListeView/>
            -->

            <BratenChatView/>
          </div>
        </div>
        <div class="column">
          <VegetarizitaetsRechner />
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
//import BratenListeView from "@/views/BratenListeView.vue";
import BratenChatView from "@/views/BratenChatView.vue";

export default Vue.extend({
  name: "App",
  components: {
    VegetarizitaetsRechner,
    BratenChatView,
    BratChat
  }
});
</script>

<style>
</style>
