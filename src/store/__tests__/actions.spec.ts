import { actions } from "../actions";
import nock from "nock";
import { ActionContext } from "vuex";
import { AppState, state } from "@/store/state";

import Api from "@/resources/api";

const testEntities = [
  {
    name: "Backlog",
  },
  {
    name: "Product",
  },
];

const mockBoardsReponse = {
  Entities: testEntities,
  TotalRecords: 2,
};

describe("fetchBoards", () => {
  //const endpoint = "/boards";

  const commit = jest.fn();

  it("should fetch boards for user and set them in the store", async () => {
    nock(Api.BaseUrl)
      .defaultReplyHeaders({ "access-control-allow-origin": "*" })
      .get(Api.Boards.replace(Api.BaseUrl, ""))
      .reply(200, mockBoardsReponse);

    const fetchBoards = actions.fetchBoards as Function;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actionContext: ActionContext<AppState, any> = {
      dispatch: jest.fn(),
      commit: commit,
      state: state, // here goes your auth state mock
      getters: {},
      rootState: {}, // here goes your root state mock
      rootGetters: {},
    };

    await fetchBoards(actionContext, { commit });

    expect(commit).toHaveBeenCalledWith("setBoards", testEntities );
  });
});
