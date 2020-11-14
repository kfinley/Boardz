import { MutationTree } from "vuex";
import { AppState } from "boardz";

export const mutations: MutationTree<AppState> = {  
  setSocketsSetup: (state: AppState) => {
    state.socketsSetup = true;
  }
};
