import { Board } from "../entities";

export interface AppState {
  boards: Array<Board>;
  socketsSetup: boolean;
}

export const state: AppState = {
  boards: [],
  socketsSetup: false
};
