<template>
  <div class="regBack">
    <div
      class="regWrap container d-flex flex-column justify-content-center align-items-center"
    >
      <div class="row mb-3 col-8 col-md-6">
        <label class="inputLabel fs-5 me-3 justify-self-start" for="fileform"
          >ID</label
        >
        <input
          type="text"
          class="form-control"
          id="fileform"
          placeholder="userid"
          v-model="userdata.userid"
        />
      </div>
      <div class="row mb-3 col-8 col-md-6">
        <label class="inputLabel fs-5 me-3 justify-self-start" for="fileform"
          >PASSWORD</label
        >
        <input
          type="password"
          class="form-control"
          id="fileform"
          placeholder="password"
          v-model="userdata.password"
        />
      </div>
      <div class="row mb-3 col-8 col-md-6">
        <label class="inputLabel fs-5 me-3 justify-self-start" for="fileform"
          >이름</label
        >
        <input
          type="text"
          class="form-control"
          id="fileform"
          placeholder="username"
          v-model="userdata.username"
        />
      </div>
      <div class="row mb-3 col-8 col-md-6">
        <label class="inputLabel fs-5 me-3 justify-self-start" for="fileform"
          >주소</label
        >
        <input
          type="text"
          class="form-control"
          id="fileform"
          placeholder="addr"
          v-model="userdata.addr"
        />
      </div>
      <div class="row mb-3 col-8 col-md-6">
        <label class="inputLabel fs-5 me-3 justify-self-start" for="fileform"
          >대표 이미지</label
        >
        <div class="input-group">
          <input
            type="file"
            class="form-control"
            id="fileform"
            @change="handleImage"
            accept="image/*"
          />
          <label class="input-group-text" for="fileform">Upload</label>
        </div>
      </div>
      <div class="btn btn-primary" @click="addUser">회원가입</div>
    </div>
  </div>
  <!-- {{ userdata }} -->
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const userdata = ref({
  userid: null,
  password: null,
  username: null,
  addr: null,
  image: null,
});

const clearform = () => {
  userdata.value.userid = null;
  userdata.value.password = null;
  userdata.value.username = null;
  userdata.value.addr = null;
  userdata.value.image = null;
};

const addUser = () => {
  let uData = {
    userid: userdata.value.userid,
    password: userdata.value.password,
    username: userdata.value.username,
    addr: userdata.value.addr,
    image: userdata.value.image,
  };
  store.commit("addUser", uData);
  clearform();
  router.push("/");
};

const handleImage = (e) => {
  const file = e.target.files[0];
  console.log(file);
  if (file) {
    userdata.value.image = URL.createObjectURL(file);
  }
};
</script>

<style lang="scss" scoped>
.regBack {
  height: 100%;
  background-image: url("../assets/images/coffee.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  .regWrap {
    height: 100%;
  }
}
</style>
