import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Container from "@/components/Container.vue";
import PageNotFound from "@/components/PageNotFound.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "container",
    component: Container,
  },
  { path: "/:pathMatch(.*)*", component: PageNotFound },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
