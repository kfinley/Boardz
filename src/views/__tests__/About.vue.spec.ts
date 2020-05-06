import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { shallowMount } from "@vue/test-utils";

import router from "@/router";
import BoardsPlugin from "@/plugin";
import About from "@/views/About.vue";

Vue.use(Vuex);
Vue.use(VueRouter);

const store = new Vuex.Store({});

Vue.use(BoardsPlugin, {
  router,
  store,
});

describe("About.vue", () => {
  it("About View renders", () => {
    const wrapper = shallowMount(About);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
