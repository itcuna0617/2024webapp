<template>
  <div class="container mt-5">
    <h2>{{ $route.name }}</h2>
    <hr />
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum aperiam
    accusantium qui aut id sunt sed repudiandae repellendus culpa enim?
    <!-- route -> 페이지에서 쓸 수 있는 정보를 나타낼 때 사용 -->
    <!-- router -> 페이지를 이동할 때 사용 -->
    <h3>{{ $route }}</h3>
    {{ $route.params }} / {{ $route.name }}
    <p>{{ props.data[0] }}</p>
    <!-- $router -> 페이지를 이동할 때 사용 -->
    <!-- <div class="btn btn-primary" @click="$router.push('/')">home</div> -->
    <div class="btn btn-primary" @click="$router.push({ name: 'home' })">
      home
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Array,
});
</script>

<style lang="scss" scoped></style>
