import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UserView from "../views/UserView.vue";
import UserDetailView from "../views/UserDetailView.vue";
import UserRegisterView from "../views/UserRegisterView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/user",
      name: "user",
      component: UserView,
    },
    {
      path: "/user/:id",
      name: "user detail",
      component: UserDetailView,
    },
    {
      path: "/register",
      name: "user register",
      component: UserRegisterView,
    },
  ],
});
export default router;