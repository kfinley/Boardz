import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";

import EntitiesModule from "../entity";

export const storeFactory = (commit?: any) => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  const store = new Vuex.Store({
    modules: {
      Entity: EntitiesModule,
    },
    //TODO: do we need this?
    getters: {
      
    }
  });

  if (commit !== undefined) store.commit = commit;

  return store;
};
