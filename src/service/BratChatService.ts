import Vue from 'vue'
import CompositionApi, {ref, computed} from '@vue/composition-api'
import {Client} from '@stomp/stompjs'

Vue.use(CompositionApi)

const lines = ref(new Array<string>())
const isConnected = ref(false)

const wsurl = "ws://localhost:9090/stompbroker"
const SEND = "/topic/bratchat/toserver"
const RCV = "/topic/bratchat/fromserver"

let stompclient: Client

function startChat() {
    if (!stompclient) {
        stompclient = new Client({brokerURL: wsurl})
        stompclient.onConnect = () => {
            isConnected.value = true
            stompclient.subscribe(RCV, (message) => {
                const delcount = lines.value.length < 20 ? 0 : 1
                lines.value.splice(0, delcount, message.body)
            })
        }
    }
    stompclient.activate()
}

function send(nachricht: string) {
    startChat()
    try {
        stompclient.publish({destination: SEND, headers: {}, body: nachricht})
    } catch (error) {
        console.log(error)
    }
}


export function useBratChatService() {
    return {
        lines: computed(() => lines),
        isConnected: computed(() => isConnected),
        send,
        startChat
    }
}
