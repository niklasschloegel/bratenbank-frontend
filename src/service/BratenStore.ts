// Wir sind noch auf Vue2, daher muss Vue3-Composition-API nachregistriert werden,
// damit reactive(), compute(), ref() und Co funktionieren
//////////////////////////////////////////////////////////////////////////////
import Vue from 'vue'
import CompositionApi, { reactive } from '@vue/composition-api'
import {Client, Message} from '@stomp/stompjs';

Vue.use(CompositionApi)
//////////////////////////////////////////////////////////////////////////////

import { computed } from '@vue/composition-api'
import '@/service/Braten'

/**************************************************/

const wsurl = "ws://localhost:9090/stompbroker"
const DEST = "/topic/braten"


const state = reactive({
  liste: Array<Braten>(),
  errormessage: ""
})

const stompclient = new Client({brokerURL: wsurl})
stompclient.onConnect = (frame) => {
  stompclient.subscribe(DEST, (message) => {
    const bratenMsg: BratenMessage = JSON.parse(message.body)
    if (bratenMsg.operation === "delete") {
      state.liste = state.liste.filter(b => b.id !== bratenMsg.braten.id)
    } else if (bratenMsg.operation === "change") {
      state.liste = state.liste.filter(b => b.id !== bratenMsg.braten.id)
      state.liste.push(bratenMsg.braten)
    }
  });
};
stompclient.activate()

function push(ele: Braten): void {
  state.liste.push(ele)
}


async function update(): Promise<void> {

  const url = "/api/braten"
  const bratenliste = Array<Braten>()

  try {
    const response = await fetch(url)
    const jdata: Array<Braten> = await response.json()
    for (const b of jdata) {
      console.debug(b)
      bratenliste.push(b)
    }
    state.liste = bratenliste
    state.errormessage = ""
  } catch (reason) {
    console.log(`FEHLER: ${reason}`)
    state.errormessage = "Fehler bei der Serverkommunikation"
  }


}

async function remove(id: number): Promise<void> {
  const url = `/api/braten/${id}`
  try {
    await fetch(url, {method: 'delete'})
  } catch (reason) {
    console.log(`FEHLER: ${reason}`)
    state.errormessage = "Fehler bei der Serverkommunikation"
  }
}

/*
 * Die exportierte use..()-Funktion gibt gezielten Zugriff auf von außen nutzbare Features
 * Verwendung einfach mit import und Auswahl gewünschter Features, z.B. so:
 * const { liste, update } = useBraten()
 */
export function useBraten() {
  return {
    // computed() zur Erzeugung einer zwar reaktiven, aber read-only-Version der Liste und der Fehlermeldung
    liste: computed(() => state.liste),
    errormessage: computed(() => state.errormessage),
    update,
    push,
    remove
  }
}
