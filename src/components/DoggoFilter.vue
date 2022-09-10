<script setup lang="ts">
import { Action, DoggoState } from "@/store";
import { computed, ComputedRef, ref } from "vue";
import { useStore } from "vuex";

const store = useStore<DoggoState>();
const breeds: ComputedRef<string[]> = computed(() => store.getters.breeds);
const filterByBreed = (breed) => store.dispatch(Action.SET_DOGGO_FILTER, breed);
</script>
<template>
  <div class="filter-container">
    <h5>Find your dog by breed:</h5>
    <p>
      <input
        name="breed-filter"
        v-model="store.state.breedFilter"
        class="breed-filter"
        placeholder="Search by enter text"
      />
    </p>
  </div>
</template>
<style scoped>
.filter-container {
  background-color: lightblue;
}
.breed-filter {
  width: 60%;
  padding: 10px;
  border-radius: 10px;
}
</style>
