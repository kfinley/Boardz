import { actions } from "../actions";
import nock from "nock";
import { ActionContext } from 'vuex';
import { AppState, state } from "@/store/state";

const mockBoardsReponse = [
  {
    title: "Backlog",
  },
  {
    title: "Product",
  },
];

describe("fetchBoards", () => {
  const api = "https://boardz.app/api/v1";
  const endpoint = "/boards";

  const commit = jest.fn();

  it("should fetch boards for user and set them in the store", async () => {
    nock(api)
      .defaultReplyHeaders({ "access-control-allow-origin": "*" })
      .get(endpoint)
      .reply(200, {
        mockBoardsReponse,
      });
      
    const fetchBoards = actions.fetchBoards as Function;

    const actionContext: ActionContext<AppState, any> = {
      dispatch: jest.fn(),
      commit: commit,
      state: state, // here goes your auth state mock
      getters: {},
      rootState: {}, // here goes your root state mock
      rootGetters: {}
    };
    
    await fetchBoards(actionContext, { commit });

    expect(commit).toHaveBeenCalledWith("setBoards", { mockBoardsReponse });
  });
});
