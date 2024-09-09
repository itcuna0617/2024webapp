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
  },
});
