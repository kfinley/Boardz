import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";

export interface AppState {
  appName: string;
  socketsSetup: boolean;
}

export const AppState: AppState = {
  appName: "",
  socketsSetup: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ClientModule: Module<AppState, any> = {
  namespaced: true,
  state: AppState,
  getters,
  actions,
  mutations,
};

export default ClientModule;
