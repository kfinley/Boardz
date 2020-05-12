import { Board } from "../entities";

export interface AppState {
  boards: Array<Board>;
}

export const state: AppState = {
  boards: [],
};
