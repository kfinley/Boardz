import { MutationTree } from "vuex";
import { AppState } from "boardz";

export const mutations: MutationTree<AppState> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  boards: (state: AppState, items: any) => {
    state.boards = items;
  },
  setSocketsSetup: (state: AppState) => {
    state.socketsSetup = true;
  }
};
