<template>
  <!-- <ModalView v-if="$store.state.modalView" /> -->
  <NavbarView />
  <router-view />
  <!-- <MapView /> -->
</template>

<script setup>
import NavbarView from "./components/NavbarView.vue";
import ModalView from "./components/ModalView.vue";
// import MapView from "./components/user/MapView.vue";
</script>

<style lang="scss" scoped></style>
