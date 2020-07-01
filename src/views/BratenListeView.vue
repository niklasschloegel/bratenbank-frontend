<template>
    <div class="box">
        <h1 class="title">Das aktuelle Angebot</h1>
        <BratenListe/>
    </div>
</template>

<script>
    import BratenListe from "@/components/BratenListe.vue";
    import {defineComponent} from "@vue/composition-api";
    export default defineComponent({
        name: "BratenListeView",
        components: {
            BratenListe
        }})
</script>

<style scoped>

</style>