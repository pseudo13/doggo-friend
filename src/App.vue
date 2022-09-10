<template>
  <nav>
    <router-link to="/">Your full list of doggos</router-link> |
    <router-link to="/random">Random doggos</router-link>
  </nav>
  <doggo-filter></doggo-filter>
  <router-view />
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { useStore } from "vuex";
import { Action, DoggoState } from "./store";
import DoggoFilter from "./components/DoggoFilter.vue";
const store = useStore<DoggoState>();
onMounted(() => {
  console.log("abc");
  store.dispatch(Action.GET_DOGGO_LIST);
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
