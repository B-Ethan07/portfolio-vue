// src/main.ts
import { createApp } from "vue";
import "./main.css";
import App from "./App.vue";
import router from "./router/index";
import { i18n } from "./i18n";

createApp(App).use(router).use(i18n).mount("#app");
