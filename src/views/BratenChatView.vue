<template>
    <div class="box">
        <h1 class="title">Braten-Community Chat</h1>
        <BratChat/>
    </div>
</template>

<script>
    import BratChat from "@/components/BratChat.vue";
    import {defineComponent} from "@vue/composition-api";

    export default defineComponent({
        name: "BratenChatView",
        components: {
            BratChat
        }
    })
</script>

<style scoped>

</style>