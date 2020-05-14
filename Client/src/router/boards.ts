import { RouteConfig } from "vue-router";

export const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
  },
  {
    path: "/boards",
    name: "Boards",
    component: () =>
      import(/* webpackChunkName: "boards" */ "@/views/Boards.vue"),
  },
];