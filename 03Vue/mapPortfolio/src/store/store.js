import { createStore } from "vuex";

export default createStore({
  state: {
    modalView: false,
    userData: [
      {
        userid: "hanyong5",
        password: "123",
        username: "홍길동",
        addr: "서울",
        image: "https://picsum.photos/100",
      },
      {
        userid: "ttomi",
        password: "123",
        username: "김유신",
        addr: "서울",
        image: "https://picsum.photos/100",
      },
      {
        userid: "test",
        password: "123",
        username: "감강찬",
        addr: "서울",
        image: "https://picsum.photos/100",
      },
    ],
    loginUserData: {
      userid: null,
      password: null,
      username: null,
      addr: null,
      image: null,
    },
  },

  mutations: {
    addUser(state, payload) {
      state.userData.push(payload);
      console.log(state.userData);
    },
    updateUser(state, payload) {
      let i = state.userData.findIndex(
        (user) => user.userid === payload.userid
      );
      state.userData[i].username = payload.username;
      state.userData[i].password = payload.password;
      state.userData[i].addr = payload.addr;
      state.userData[i].image = payload.image;

      console.log(state.userData);
    },
    deleteUser(state, payload) {
      let i = state.userData.findIndex(
        (user) => user.userid === payload.userid
      );

      if (i !== -1) {
        state.userData.splice(i, 1);
      }

      console.log(state.userData);
    },
    login(state, payload) {
      state.loginUserData.userid = state.userData[payload].userid;
      state.loginUserData.password = state.userData[payload].password;
      state.loginUserData.username = state.userData[payload].username;
      state.loginUserData.addr = state.userData[payload].addr;
      state.loginUserData.image = state.userData[payload].image;
    },
    openAddress(state, payload) {
      state.modalView = true;
    },
  },
  actions: {
    loginCheck(context, tempdata) {
      let i = context.state.userData.findIndex(
        (user) => user.userid === tempdata.value.userid
      );
      console.log(context.state.userData);
      console.log(
        "userid : " +
          tempdata.value.userid +
          " password : " +
          tempdata.value.password +
          " i : " +
          i
      );
      if (i === -1) {
        return false;
      } else {
        if (context.state.userData[i].password === tempdata.value.password) {
          context.commit("login", i);
          return true;
        } else {
          return false;
        }
      }
    },
    addUserCheck(context, tempdata) {
      let i = context.state.userData.findIndex(
        (user) => user.userid === tempdata.userid
      );
      console.log(context.state.userData);
      console.log(
        "userid : " +
          tempdata.userid +
          " password : " +
          tempdata.password +
          " i : " +
          i
      );
      if (i === -1) {
        context.commit("addUser", tempdata);
        return true;
      } else {
        return false;
      }
    },
  },
});
