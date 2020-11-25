import Vue from "vue";
import Vuex from "vuex";
import { createLocalVue, mount, shallowMount, VueClass } from "@vue/test-utils";
import EntitiesModule from "./../../store/entities";

export default (
  VueComponent: VueClass<Vue>,
  propsData?: any,
  storeMocks?: any,
  attrs?: any
) => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store({
    mutations: storeMocks,
    actions: storeMocks,
    modules: {
      Entity: EntitiesModule,
    },
  });
  const comp = mount(VueComponent, {
    propsData,
    attrs,
    store,
    localVue,
  });

  Vue.nextTick();

  return comp;
};
