import { getters } from "@/store/getters";
import { AppState } from "@/store/state";

// mock State
const mockState: AppState = {
  allBoards: [
    {
      name: "Test Board",
    },
  ],
};

describe("Getters", () => {
  it("allBoards: returns allBoards", () => {
    // arrange
    const allBoards = getters.boards as Function;

    // act
    const result = allBoards(mockState);

    // assert
    expect(result).toEqual(mockState.allBoards);
  });

});
