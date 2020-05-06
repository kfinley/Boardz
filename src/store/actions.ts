import { ActionTree } from "vuex";
import { AppState } from "./state";
import Axios from "axios";
import Api from "@/resources/api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const actions: ActionTree<AppState, any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetchBoards({ commit, dispatch }) {
    try {     
      const response = await Axios.get(Api.Boards);
      commit("setBoards", response.data);
    } catch (e) {
      throw Error("API Error. FIX THIS!");
    }
  },
};
