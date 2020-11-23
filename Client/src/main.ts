import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import "./registerServiceWorker";
import VueRouter from "vue-router";
import router from "./router";
import ClientPlugin from './plugin';
import store  from '@/store/root';
import { Socket } from 'api';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueRouter);

Vue.use(ClientPlugin, {
  router,
  store,
  socket: Socket
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
