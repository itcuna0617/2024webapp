import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../components/HomeView.vue";
import AboutView from "../components/AboutView.vue";
import PortfolioView from "../components/PortfolioView.vue";
import DetailView from "../components/DetailView.vue";

const router = createRouter({
  history: createWebHistory(),
  // 여기에는 경로명이 들어감(Object 형태)
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/portfolio",
      name: "portfolio",
      component: PortfolioView,
    },
    {
      // :id 부분의 이름은 직접 정하면 됨
      path: "/portfolio/:id",
      name: "portfolio detail",
      component: DetailView,
    },
  ],
});

export default router;
