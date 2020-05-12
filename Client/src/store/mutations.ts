import { MutationTree } from "vuex";
import { AppState } from "boardz";

export const mutations: MutationTree<AppState> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setBoards: (state: AppState, items: any) => {
    state.boards = items;
  },
};
