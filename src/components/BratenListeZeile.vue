<template>
  <tr class="bratenzeile">
    <td>{{b.beschreibung}}</td>
    <td>{{b.haltbarbis}}</td>
    <td>
      <StarRating :maxsterne="5" :sterne="b.vgrad / 25" />
    </td>
    <td>{{b.anbieter.vollname}}, {{b.abholort}}</td>
    <td>
      <i @click="delclicked()" class="fa fa-trash" />
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import StarRating from "@/components/StarRating.vue";
import "@/service/Braten";

export default defineComponent({
  name: "BratenListeZeile",
  components: {
    StarRating
  },
  props: {
    braten: Object
  },
  setup(props, context) {
    const b = props.braten as Braten
    function delclicked() {
      context.emit("delete-zeile", b.id);
    }
    return { b, delclicked };
  }
});
</script>

<style scoped>
</style>
