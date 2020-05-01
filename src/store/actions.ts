import { ActionTree } from "vuex";
import { AppState } from "./state";
import Axios from "axios";

export const actions: ActionTree<AppState, any> = {
  async fetchBoards({ commit, dispatch }) {
    const url = "https://bubblingocean.com/api/v1/boards";

    try {
      const response = await Axios.get(url);
      commit("setBoards", response.data);
    } catch (e) {
      throw Error("API Error. FIX THIS!");
    }
  }
};