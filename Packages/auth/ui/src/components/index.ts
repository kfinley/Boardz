import Vue from "vue";
import Login from "./Login.vue";

const Components = {
  Login,
};

Object.keys(Components).forEach(name => {
  Vue.component(name, (Components as any)[name]);
});

export default Components;
