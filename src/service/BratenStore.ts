// Wir sind noch auf Vue2, daher muss Vue3-Composition-API nachregistriert werden,
// damit reactive(), compute(), ref() und Co funktionieren
//////////////////////////////////////////////////////////////////////////////
import Vue from 'vue'
import CompositionApi, { reactive } from '@vue/composition-api'
Vue.use(CompositionApi)
//////////////////////////////////////////////////////////////////////////////

import { computed } from '@vue/composition-api'

import '@/service/Braten'

/**************************************************/

const state = reactive({
  liste: Array<Braten>(),
  errormessage: ""
})

function push(ele: Braten): void {
  state.liste.push(ele)
}


async function update(): Promise<void> {

  const bratenliste = Array<Braten>()
  const url = "/api/braten"

  try {
    const response = await fetch(url)
    const jdata: Array<Braten> = await response.json()
    for (const b of jdata) {
      bratenliste.push(b)
    }
    state.errormessage = ""
  } catch (reason) {
    console.log(`FEHLER: ${reason}`)
    state.errormessage = "Fehler bei der Serverkommunikation"
  }

  state.liste = bratenliste

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
    push
  }
}
