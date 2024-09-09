<template>
  <div class="homeBackground d-flex justify-content-center align-items-center">
    <div
      class="loginBox bg-gray d-flex flex-column justify-content-center align-items-center fs-4"
    >
      <div class="text-white mb-3">
        <h3>Login</h3>
      </div>
      <div class="inputWrap mb-4 d-flex">
        <label
          class="inputLabel text-white me-3 justify-self-start"
          for="fileform"
          >ID</label
        >
        <input
          type="text"
          class="inputText rounded justify-self-end"
          id="fileform"
          placeholder="id"
        />
      </div>
      <div class="inputWrap mb-3 d-flex">
        <label class="inputLabel text-white me-3" for="fileform">PWD</label>
        <input
          type="password"
          class="inputText rounded"
          id="fileform"
          placeholder="password"
        />
      </div>
      <div class="btn-group">
        <div class="btn btn-primary mt-2 me-4 rounded" @click="addUser">
          로그인
        </div>
        <div class="btn btn-primary mt-2 rounded" @click="registerUser">
          회원가입
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const registerUser = () => {
  router.push("/register");
};
</script>

<style lang="scss" scoped>
.homeBackground {
  background-image: url("../assets/images/coffee.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  .loginBox {
    width: 400px;
    height: 270px;
    background-color: gray;
    border-radius: 6%;

    .inputLabel {
      width: 50px;
    }
  }
}
</style>
