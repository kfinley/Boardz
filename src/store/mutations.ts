import { MutationTree } from "vuex";
import { AppState } from "./state";

export const mutations: MutationTree<AppState> = {
  setBoards: (state: AppState, items: any) => {
    state.boards = items;
  },
};
