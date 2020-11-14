import { RouteConfig } from "vue-router";

export const routes: Array<RouteConfig> = [
  {
    path: "/boards",
    name: "Boards",
    component: () =>
      import(/* webpackChunkName: "boards" */ "@/views/Boards.vue"),
  },
  {
    path: "/board/add",
    name: "AddBoard",
    component: () =>
      import(/* webpackChunkName: "boards" */ "@/views/AddBoard.vue"),
  },
];
