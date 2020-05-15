import { ActionTree } from "vuex";
import { AppState } from "boardz";
import { configureListeners } from "@/sockets";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const actions: ActionTree<AppState, any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async setupSockets({ commit, state, rootState }) {
    
    configureListeners(commit);

    commit("setSocketsSetup");
  },
};
