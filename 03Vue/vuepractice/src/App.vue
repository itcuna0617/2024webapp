<template>
  <div>
    <NavbarView />
    <MainView />

    <!-- {{ weatherData }} -->
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import NavbarView from "./components/NavbarView.vue";
import { useStore } from "vuex";
import MainView from "./components/MainView.vue";

const store = useStore();

onMounted(() => {
  // getWeather();
  store.dispatch("getWeather");
});
</script>

<style lang="scss" scoped></style>
