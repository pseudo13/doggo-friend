<template>
  <nav>
    <router-link to="/">Your full list of doggos</router-link> |
    <router-link to="/random">Random doggos</router-link> |
    <router-link to="/my-doggos">My doggos</router-link>
  </nav>
  <router-view />
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { useStore } from "vuex";
import { Action, DoggoState } from "./store";

const store = useStore<DoggoState>();
onMounted(() => {
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

nav a.active {
  color: orange;
}
</style>
