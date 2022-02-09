import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Container from "@/components/Container.vue";
import Page_404 from "@/components/Page_404.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "container",
    component: Container,
  },
  { path: "/:pathMatch(.*)*", component: Page_404 },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
