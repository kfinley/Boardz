import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { state, AppState } from "./state";

import User from "./modules/User";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LeanBoardModule: Module<AppState, any> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    User
  },
};

export default LeanBoardModule;

