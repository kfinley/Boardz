import EntityModule from "../store/entity";

export interface AppState {
  appName: string;
  socketsSetup: boolean;
}

export const AppState: AppState = {
  appName: "",
  socketsSetup: false,
};
