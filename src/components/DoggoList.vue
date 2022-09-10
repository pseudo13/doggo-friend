<script setup lang="ts">
import { computed, onMounted } from "vue";
import { Action, Doggo, DoggoState } from "@/store";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore<DoggoState>();
const router = useRouter();
const doggoList = computed(() => store.getters.doggoList);
const gotoDetails = (id) => {
  router.push(`doggo/${id}`);
};
onMounted(() => {
  console.log("abc");
  store.dispatch(Action.GET_DOGGO_LIST);
});
</script>
<template>
  <div class="container">
    <h1>Favourite doggos</h1>
    <table class="doggo-list table table-bordered">
      <tr>
        <th>Name</th>
        <th>Temperament</th>
        <th>Origin</th>
        <th>Details</th>
      </tr>
      <tr class="doggo" v-for="doggo in doggoList" :key="doggo.id">
        <td>{{ doggo.name }}</td>
        <td>{{ doggo.temperament }}</td>
        <td>{{ doggo.origin }}</td>
        <td>
          <button
            class="btn btn-info"
            @click="gotoDetails(doggo.id)"
            style="margin: 5px; padding: 5px"
          >
            Details
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>
<style scoped>
.doggo-list {
  padding: 10px;
  border: 1px solid darkgray;
}
td,
th,
tr {
  padding: 5px;
}
</style>
