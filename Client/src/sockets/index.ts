import { Commit } from "vuex";
import { Board } from "boardz";
import { Socket } from "api";

export function configureListeners(commit: Commit) {
  Socket.on("boards", (data: Board[]) => {    
    commit("boards", data);
  });
  
}
