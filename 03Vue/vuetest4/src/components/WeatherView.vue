<template>
  <div class="weather-info">
    <div class="icon">
      <img
        :src="`https://openweathermap.org/img/wn/${$store.state.weatherData.icon}@4x.png`"
        alt=""
      />
    </div>
    <div class="temp">
      {{ ($store.state.weatherData.temp - 273.15).toFixed(2) }}&deg
    </div>
    <div class="text">{{ $store.state.weatherData.text }}</div>
    <div class="location">
      {{ $store.state.weatherData.location }} /
      {{ $store.state.weatherData.city }}
    </div>
    <div>
      <!-- {{ $store.state.name }}
      {{ $store.state.counter }} -->
      <!-- mutation을 실행하기 싶으면 commit을 통해 mutation을 실행시킬 수 있음(변형시킬 수 있음) -->
      <!-- <button @click="$store.commit('addCount', 10)">넘버</button> -->
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
