import { RouteConfig } from "vue-router";

export const routes: Array<RouteConfig> = [
  {
    path: "/boards",
    name: "Boards",
    component: () =>
      import(/* webpackChunkName: "boards" */ "@/views/Boards.vue"),
  },
  {
    path: "/board/:nameSlug",
    name: "Board",
    component: () =>
      import(/* webpackChunkName: "board" */ "@/views/Board.vue"),
  },
  {
    path: "/board/add",
    name: "AddBoard",
    component: () =>
      import(/* webpackChunkName: "addboards" */ "@/views/AddBoard.vue"),
  },
];
