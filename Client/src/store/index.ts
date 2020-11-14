import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { AppState } from "boardz";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ClientModule: Module<AppState, any> = {
  namespaced: true,
  state: AppState,
  getters,
  actions,
  mutations,
};

export default ClientModule;
