import Vue from "vue";
import Vuex from "vuex";
import { createLocalVue, mount, shallowMount, VueClass } from "@vue/test-utils";
import * as EntitiesStore from "../../store";

function component(
  Component: VueClass<Vue>,
  propsData?: any,
  storeMocks?: {
    actions: {},
    mutations: {},
    getters: {}
  },
  state?: {},
  attrs?: any
) {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let storeOptions = {};
  storeOptions = {
    plugins: EntitiesStore.plugins,
  };

  if (storeMocks !== undefined) {
    storeOptions = {
      ...storeOptions,
      mutations: storeMocks.mutations,
      actions: storeMocks.actions,
      getters: storeMocks.getters 
    };
  }
  const store = new Vuex.Store(storeOptions);
  
  if (state !== undefined) {
    store.replaceState(state);
  }

  let comp = mount(Component, {
    propsData,
    attrs,
    store,
    localVue,
  });

  return comp;
}

async function componentWithData(
  Component: VueClass<Vue>,
  propsData?: any,
  data?: any,
  storeMocks?: {
    actions: {},
    mutations: {},
    getters: {}
  },
  attrs?: any
) {
  const comp = component(Component, propsData, storeMocks, attrs);

  comp.setData(data);
  await comp.vm.$nextTick();

  return comp;
}

export default { component, componentWithData };
