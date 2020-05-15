import { Commit } from "vuex";
import { AuthResponse } from "@/types";
import { Socket } from "api";

export function configureListeners(commit: Commit) {
  
  Socket.on("Auth/success", (data: AuthResponse) => {
    
    commit("Auth/success", data);
  });

  Socket.on("Auth/failed", () => {
    commit("Auth/failed");
  });
}
