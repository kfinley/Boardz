import { GetterTree } from "vuex";
import { AppState } from "boardz";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getters: GetterTree<AppState, any> = {
  boards: (state) => state.boards,
};
