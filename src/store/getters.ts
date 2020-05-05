import { GetterTree } from "vuex";
import { AppState } from "./state";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getters: GetterTree<AppState, any> = {
  boards: (state) => state.allBoards,
};
