import { Board } from "@/resources/types";

export interface AppState {
  allBoards: Array<Board>;
}

export const state: AppState = {
  allBoards: [],
};
