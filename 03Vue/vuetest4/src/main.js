import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// store.js 가 아님 -> javascript 파일은 .js 생략 가능
import store from "./store/store";

// 중간에 .use(store) 추가
createApp(App).use(store).mount("#app");
