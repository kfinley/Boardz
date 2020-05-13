import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { state, AppState } from "boardz";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BoardzModule: Module<AppState, any> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default BoardzModule;

