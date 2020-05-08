import { ActionTree } from "vuex";
import { AppState } from "./state";
import { EntitiesResponse } from "@/resources/types";
import Api, { get } from "@/resources/api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const actions: ActionTree<AppState, any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetchBoards({ commit, dispatch }) {
    try {
      const response = await get<EntitiesResponse>(Api.Boards);
      commit("setBoards", response.data.Entities);
    } catch (e) {
      throw Error("API Error. FIX THIS!");
    }
  },
};
