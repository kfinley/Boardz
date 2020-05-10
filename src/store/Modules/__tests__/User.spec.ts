/* eslint-disable @typescript-eslint/camelcase */
import nock from "nock";
//import Vue from "vuex";
import { ActionContext } from "vuex";
import UserModule, { UserState, UserStatus } from "../User";
import { api } from "@/resources/api";
import qs from "querystring";
import { Config } from "@/config";

const validCreds = { username: "test@user.com", password: "P@ss" };
const invalidCreds = { username: "test@user.com", password: "NOPE" };

const mockSuccessReponse = {
  access_token:
    "eyJraWQiOiJCQXBUK21XUFU3ZzlNZFVxR1wvbUEwdThMeUtUOXp3K0JsOVRESDUxMzU3UT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1b3M1N2M3amY1c2NvcmI0MjE0b2Q2c3Y2cyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoic3lzdGVtXC9mdWxsIiwiYXV0aF90aW1lIjoxNTg4NzMwMzE5LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9vQ1o2SmZMYXEiLCJleHAiOjE1ODg3MzM5MTksImlhdCI6MTU4ODczMDMxOSwidmVyc2lvbiI6MiwianRpIjoiZTFlMTcxNzMtODA2NC00NTc0LWE0YzUtMjM5ODkxY2JhMGQ3IiwiY2xpZW50X2lkIjoiNW9zNTdjN2pmNXNjb3JiNDIxNG9kNnN2NnMifQ.jJ18ahvHJ7CP1H7h43uRNI1QIYT7KBKw5TfT03gB0kttWE5dq2KgFRtOuVEVU7tGxTZ2nt0NlBwOhIgTWTNOumgVooDhexDqIX0ZBcSRUyZOFE6OCaCumgMze4vtBDrwqFI45Hw8Q3QxWup_LGi5eDR9FemmBmSG03Arvwj7nbnGnqqWyCCQFa0z-PNe87E_L8ulY0VP_mph59dYhpbSDYi2fdspztf9GyA0bOXckJDiCiWmJz0i4eyS9JfPUwKB9KKT4mreu-1ugqwOamkPns_1q7B5c6m9Jh-6cyucNUZW24gvVM9QAtgp_mTZvftk-BRmXiSJX5OZpoCFYfxhCQ",
  expires_in: 3600,
  token_type: "Bearer",
};

nock(
  api.BaseUrl
  //     , {
  //   reqheaders: {
  //     "user-agent": `${navigator.userAgent} ${Config.Agent}`,
  //   },
  // }
)
  .defaultReplyHeaders({ "access-control-allow-origin": "*" })
  .post(
    api.Login.replace(api.BaseUrl, ""),
    qs.stringify({
      Email: validCreds.username,
      Password: validCreds.password,
    })
  )
  .reply(200, mockSuccessReponse);

describe("fetchBoards", () => {
  const commit = jest.fn();

  it("should login and set the user in the user store module", async () => {
    // arrange

    const login = UserModule.actions?.login as Function;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actionContext: ActionContext<UserState, any> = {
      dispatch: jest.fn(),
      commit: commit,
      state: { status: UserStatus.LoggedOut, user: { username: "" } },
      getters: {},
      rootState: {},
      rootGetters: {},
    };

    // act
    await login(actionContext, {
      username: validCreds.username,
      password: validCreds.password,
    });

    // assert
    expect(commit).toHaveBeenCalledWith("loginSuccess", {
      username: "test@user.com",
    });

  });
});
