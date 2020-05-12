import { RouteConfig } from "vue-router";
import components from "../components";


const pluginRoutes: Array<RouteConfig> = [
  {
    path: "/auth",
    name: "Auth",
    component: (components as any)["Login"],
    // component: () =>
    //   import(/* webpackChunkName: "auth" */ "../views/Auth.vue"),
  },
];

export default pluginRoutes;
