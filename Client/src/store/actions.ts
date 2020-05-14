import { ActionTree } from "vuex";
import { AppState, Board } from "boardz";
import { Socket, authHelper } from "api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const actions: ActionTree<AppState, any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetchBoards({ commit, dispatch }) {
    try {
      console.log("fetching boards");
      Socket.emit("authenticate", authHelper.authToken())
      Socket.emit("get-boards");
      console.log("done");
    } catch (e) {

      throw Error("API Error. FIX THIS!");
    }
  },
  async setupSockets({ commit, dispatch }) {
    console.log("setting up sockets");
    Socket.on("boards", (data: Board[]) => {
      console.log(data);
      commit("setBoards", data);
    });
    console.log("sockets setup");
  },
};
