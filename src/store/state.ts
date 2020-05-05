import { Board } from '@/resources/types';

export interface AppState {
  allBoards: Board[];
}

export const state: AppState = {
  allBoards: [],
};
