<template>
  <div>
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        v-model="userdata.userid"
        disabled
      />
    </div>
    <div class="mb-3">
      <input type="text" class="form-control" v-model="userdata.password" />
    </div>
    <div class="mb-3">
      <input type="text" class="form-control" v-model="userdata.username" />
    </div>
    <div class="mb-3">
      <input type="text" class="form-control" v-model="userdata.addr" />
    </div>
    <div class="input-group mb-3">
      <input
        type="file"
        class="form-control"
        id="fileform"
        @change="handleImage"
        accept="image/*"
      />
      <label class="input-group-text" for="fileform">Upload</label>
    </div>
    <div class="mb-1"><img :src="user.image" alt="" /></div>
    <div class="btn btn-primary mb-1" @click="updateUser">회원정보수정</div>
  </div>
  {{ userdata }} / {{ user }}
  <!-- <br /> -->
  <div class="btn btn-primary" @click="deleteUser">삭제</div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();
const router = useRouter();

const user = store.state.userData.find((u) => u.userid === route.params.id);

console.log(user);

const userdata = ref({
  userid: user.userid,
  password: user.password,
  username: user.username,
  addr: user.addr,
  image: user.image,
});

const clearform = () => {
  userdata.value.userid = null;
  userdata.value.password = null;
  userdata.value.username = null;
  userdata.value.addr = null;
  userdata.value.image = null;
};

const updateUser = () => {
  let uData = {
    userid: userdata.value.userid,
    password: userdata.value.password,
    username: userdata.value.username,
    addr: userdata.value.addr,
    image: userdata.value.image,
  };
  store.commit("updateUser", uData);
  router.push("/user");
};

const deleteUser = () => {
  console.log("teset" + store.state.userData);
  let uData = {
    userid: userdata.value.userid,
    password: userdata.value.password,
    username: userdata.value.username,
    addr: userdata.value.addr,
    image: userdata.value.image,
  };
  store.commit("deleteUser", uData);
  router.push("/user");
};

const handleImage = (e) => {
  const file = e.target.files[0];
  console.log(file);
  if (file) {
    userdata.value.image = URL.createObjectURL(file);
  }
};
</script>

<style lang="scss" scoped></style>
