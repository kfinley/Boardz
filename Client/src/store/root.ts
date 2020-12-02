import Vuex from "vuex";
//TODO: fix this
import * as EntitiesStore from "entities/src/store";
const root = new Vuex.Store({
  state: {
    appName: "Boardz",
  },
  plugins: EntitiesStore.plugins
});

export default root;
