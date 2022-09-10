<script setup lang="ts">
import { Doggo, DoggoState } from "@/store";
import { computed, ComputedRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const route = useRoute();
const router = useRouter();
const store = useStore<DoggoState>();
const details: ComputedRef<Doggo> = computed<Doggo>(() =>
  store.getters.doggoDetails(route.params.id)
);
const gobackToList = () => router.push("/");
</script>
<template>
  <div class="container">
    <header>
      <button @click="gobackToList()" class="btn btn-primary">
        Back to doggo list
      </button>
    </header>
    <div class="doggo-details">
      <h5>My name is: {{ details.name }}</h5>
      <p v-if="details.alt_names">My other names: {{ details.alt_names }}</p>
      <p>
        <span v-if="details.bred_for">Breed: {{ details.bred_for }} -</span>
        <span v-if="details.breed_group"
          >Breed group: {{ details.breed_group }}</span
        >
      </p>
      <p>Gonna live with you: {{ details.life_span }} years long.</p>
      <p v-if="details.weight">
        My weight is {{ details.weight.imperial }} pounds
      </p>
      <p v-if="details.weight">Or {{ details.weight.metric }} kilograms</p>
      <p v-if="details.temperament">
        <span class="prop-default">I'm friendly and</span>
        <span
          class="doggo-prop"
          :key="prop"
          v-for="prop in details.temperament.split(',')"
          >{{ prop }}</span
        >
      </p>
      <div><img class="doggo-preview" :src="details.image?.url" /></div>
    </div>
  </div>
</template>
<style scoped>
img.doggo-preview {
  width: 400px;
}
.doggo-prop {
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid darkgray;
}
.prop-default {
  background-color: orange;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 5px;
}
</style>
