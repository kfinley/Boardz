import { RouteConfig } from "vue-router";

export const routes: Array<RouteConfig> = [  
  {
    path: "/board/:nameSlug",
    name: "Board",
    component: () =>
      import(/* webpackChunkName: "board" */ "@/components/Board/Board.vue"),
  },
  {
    path: "/board/add",
    name: "AddBoard",
    component: () =>
      import(/* webpackChunkName: "addboards" */ "@/views/AddBoard.vue"),
  },
];
