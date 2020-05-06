import Vue from 'vue'
import Vuex from "vuex";
import VueRouter from "vue-router";
import { shallowMount } from '@vue/test-utils'

import router from "@/router";
import BoardsPlugin from '@/plugin';
import Home from '@/views/Home.vue'

Vue.use(Vuex);
Vue.use(VueRouter);

const store = new Vuex.Store({});

Vue.use(BoardsPlugin, {
  router,
  store
});

describe('Home.vue', () => {
    
    it('Home View renders', () => {
      const wrapper = shallowMount(Home)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
  