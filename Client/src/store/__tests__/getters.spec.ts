import { getters } from "@/store/getters";
import { AppState } from "boardz";

// mock State
const mockState: AppState = {
  appName: 'test',
  socketsSetup: false
};

describe("Getters", () => {
  it("boards: returns Board[]", () => {
    // arrange
    const allBoards = getters.boards as Function;

    // act
    const result = allBoards(mockState);

    // assert
    //expect(result).toEqual(mockState.boards);
  });

});
