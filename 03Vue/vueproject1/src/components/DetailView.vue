<template>
  <div class="container mt-5">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias expedita
    repudiandae doloribus unde itaque hic eligendi repellat. Eos, obcaecati
    similique.

    <h2>{{ $route.name }}</h2>
    <hr />

    <!-- $route -> 페이지에서 쓸 수 있는 정보를 나타낼 때 사용 -->
    <!-- $router -> 페이지를 이동할 때 사용 -->
    <h3>{{ $route }}</h3>
    {{ $route.params }} /
    <p>{{ props.data[0] }}</p>
    <!-- <div class="btn btn-primary" @click="$router.push('/')">home</div> -->
    <div class="btn btn-primary" @click="$router.push({ name: 'home' })">
      home
    </div>

    <div v-if="item">
      <h1>{{ item.title }}</h1>
    </div>
    <div v-else>해당자료를 존재하지 않습니다.</div>
  </div>
  <hr />
  <!-- {{ id }} -->
  <hr />
  {{ route.params.id }}
  <hr />
  <!-- {{ router }}를 사용했을 때 출력된 결과는 Vue Router 객체 전체를 JSON 형식으로 문자열화한 것입니다. 
  이는 디버깅을 위해 Vue가 객체의 모든 속성과 상태를 표시한 것뿐이며, 실제로는 router 객체에 바로 접근할 수 있는 속성이 아니다
  일반적으로 <template>에서 Vue Router의 상태에 접근하려면 useRoute()를 사용하는 것이 더 깔끔하고 직관적이다. -->
  {{ router }}
  <hr />
  <!-- {{ item.value }} -->
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  data: Array,
});

const route = useRoute();
const router = useRouter();
const item = computed(() => {
  const id = parseInt(route.params.id);
  return props.data.find((item) => item.id === id);
});

console.log(route);
console.log(router);
console.log(item.value);
</script>

<style lang="scss" scoped></style>
