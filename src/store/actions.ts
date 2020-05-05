import { ActionTree } from "vuex";
import { AppState } from "./state";
import Axios from "axios";
import Api from "@/resources/api";

export const actions: ActionTree<AppState, any> = {
  async fetchBoards({ commit, dispatch }) {
    try {
      const response = await Axios.get(Api.Boards);
      commit("setBoards", response.data);
    } catch (e) {
      throw Error("API Error. FIX THIS!");
    }
  },
};