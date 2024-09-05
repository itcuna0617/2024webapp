<template>
  <div>
    <NavbarView />
    <MainView />
    <div>
      <!-- {{ $store.state.weatherData }} -->

      <button @click="$store.dispatch('getWeather')">자료 가지고 오기</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import NavbarView from "./components/NavbarView.vue";
import MainView from "./components/MainView.vue";
// vuex까지만 써도 됨 -> 이렇게 import하면 $store로 안쓰고 store로 써도되며 onMounted에서도
// 정상적으로 동작
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
  store.dispatch("getWeather");
});
</script>

<style lang="scss" scoped></style>
