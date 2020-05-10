import { ActionTree } from "vuex";
import { AppState } from "./state";
import { getList } from "@/resources/api";
import { Board } from "@/resources/entities";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const actions: ActionTree<AppState, any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetchBoards({ commit, dispatch }) {
    try {
      const response = await getList<Board>(Board);
      commit("setBoards", response.data.Entities);
    } catch (e) {
      throw Error("API Error. FIX THIS!");
    }
  },
};
