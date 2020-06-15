<template>
  <div>
    <div class="block">
      <h1 class="title">Vegetarizitätsrechner</h1>
      <div class="block">Wie setzt sich Ihr Braten zusammen?</div>
      <div class="field">
        <label class="label">kg vegetarisch</label>
        <input class="input" type="text" v-model.number="veggikg" />
      </div>
      <div class="field">
        <label class="label">kg nicht-vegetarisch</label>
        <input class="input" type="text" v-model.number="nonveggikg" />
      </div>
    </div>
    <div class="block">
      Bei einem vegetarischen Anteil von {{veggikg}} kg und einem nichtvegetarischen Anteil von {{nonveggikg}} kg
      hat Ihr Braten einen Vegetarizitätsgrad von {{prozent}} Prozent
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "@vue/composition-api";

export default defineComponent({
  // Name der Komponente
  name: "VegetarizitaetsRechner",
  setup() {
    const veggikg = ref(0);
    const nonveggikg = ref(0);
    const prozent = computed(() => Math.round(((veggikg.value) / (veggikg.value+nonveggikg.value)) * 100));

return {
      veggikg,
      nonveggikg,
      prozent
    };
  }
});
</script>

<style scoped>
</style>
