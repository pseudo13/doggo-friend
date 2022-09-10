<script setup lang="ts">
import { Action, DoggoState } from "@/store";
import { computed, on, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore<DoggoState>();
const doggoImages = computed(() => store.state.randomImages);

onMounted(() => {
  store.commit(Action.GET_RANDOM_IMAGES);
});
</script>
<template>
  <div class="container doggo-images">
    <img v-for="image in doggoImages" :src="image" :key="image" class="doggo" />
  </div>
</template>
<style scoped>
.doggo-images {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
img.doggo {
  width: 200px;
  height: 200px;
}
</style>
