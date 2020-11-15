import { MutationTree } from "vuex";
import { AppState } from "./index";

export const mutations: MutationTree<AppState> = {  
  setSocketsSetup: (state: AppState) => {
    state.socketsSetup = true;
  }
};
