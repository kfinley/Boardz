import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import "./registerServiceWorker";
import VueRouter from "vue-router";
import router from "./router";
import BoardsPlugin from './plugin';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueRouter);

const store = new Vuex.Store({});

Vue.use(BoardsPlugin, {
  router,
  store
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
