import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import AuthPlugin from './plugin';
import router from './router'

Vue.config.productionTip = false;

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    appName: "Auth"
  }
});

Vue.use(AuthPlugin, {
  router,
  store
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
