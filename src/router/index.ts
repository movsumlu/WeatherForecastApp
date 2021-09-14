import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import App from "@/components/App.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "App",
    component: App,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
