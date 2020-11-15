import { actions } from "../actions";
import nock from "nock";
import { ActionContext } from "vuex";
import { AppState } from "../index";

import { api } from "api";

// mock State
const mockState: AppState = {
  appName: 'test',
  socketsSetup: false  
};

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

describe("setupSockets", () => {

  const commit = jest.fn();

  it("should setupSockets", async () => {
    nock(api.BaseUrl)
      .defaultReplyHeaders({ "access-control-allow-origin": "*" })
      .get(api.Boards.replace(api.BaseUrl, ""))
      .reply(200, mockBoardsReponse);

    const setupSockets = actions.setupSockets as Function;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actionContext: ActionContext<AppState, any> = {
      dispatch: jest.fn(),
      commit: commit,
      state: mockState, // here goes your auth state mock
      getters: {},
      rootState: {}, // here goes your root state mock
      rootGetters: {},
    };

    await setupSockets(actionContext, { commit });

    expect(commit).toHaveBeenCalledWith("setSocketsSetup");
  });
});
