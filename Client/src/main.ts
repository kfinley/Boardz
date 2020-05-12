import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import "./registerServiceWorker";
import VueRouter from "vue-router";
import router from "./router";
import BoardsPlugin from './plugin';
import store  from '@/store/root';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueRouter);

Vue.use(BoardsPlugin, {
  router,
  store
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
