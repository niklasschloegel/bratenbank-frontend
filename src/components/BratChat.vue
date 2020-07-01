<template>
    <section>
        <form @submit.prevent="sendMsg()">
            <div class="field has-addons">
                <div class="control">
                    <label for="status" v-if="isConnected">Server connected</label><br/>
                    <input class="input is-small" id="status" type="text" v-model="chatmsg">
                </div>
                <div class="control">
                    <br>
                    <input class="is-small button is-primary" type="submit" value="abschicken"/>
                </div>
            </div>
        </form>

        <div>
            <p v-for="l in lines" :key="l">{{l}}</p>
        </div>
    </section>
</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "@vue/composition-api"
    import {useBratChatService} from "@/service/BratChatService"

    export default defineComponent({
        name: "BratChat",
        setup() {
            const {lines, isConnected, send, startChat} = useBratChatService()
            onMounted(() => startChat())

            const chatmsg = ref("")

            function sendMsg() {
                send(chatmsg.value)
                chatmsg.value = ""
            }

            console.log(lines)
            return {chatmsg, sendMsg, isConnected: isConnected.value, lines: lines.value}
        }
    })
</script>

<style scoped>

</style>