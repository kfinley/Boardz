import Vue from "vue";
import Vuex from "vuex";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

import { Credentials, AuthResponse, AuthStatus } from "auth";
import { authHelper, Socket } from "api";
import { AppUser } from "boardz";
import { Config } from "config";
import AuthState from "./state";

Vue.use(Vuex);
const store = new Vuex.Store({});

@Module({ namespaced: true, store: store, name: "Auth" })
export default class AuthModule extends VuexModule implements AuthState {
  appName = (store.state as any).appName;
  status = AuthStatus.LoggedOut;
  user?: AppUser = undefined;

  @Mutation
  request(user: AppUser) {
    this.status = AuthStatus.LoggingIn;
    this.user = user;
  }

  @Mutation
  success(response: AuthResponse) {
    //TODO: inject storage...
    //TODO: move this to command
    localStorage.setItem(`${Config.Agent}:access_token`, response.AccessToken);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    localStorage.setItem(
      `${Config.Agent}:refresh_token`,
      response.RefreshToken
    );
    this.status = AuthStatus.LoggedIn;
  }

  @Mutation
  failed() {
    this.status = AuthStatus.LoginFailed;
    this.user = undefined;
  }

  @Mutation
  logout() {
    console.log("logout")
    this.status = AuthStatus.LoggedOut;
    this.user = undefined;
  }

  @Mutation
  setAppName(name: string) {
    this.appName = name;
  }

  @Action
  async login(creds: Credentials) {
    this.context.commit("request", { username: creds.username });
    //TODO: inject Socket...
    Socket.emit("Auth/authenticate", creds);
  }

  //TODO: rework this. pass in authToken and match names
  @Action
  authorize() {
    try {
      if ((this.context.state as any).Auth.status == AuthStatus.LoggingIn) {
        this.context.commit("Auth/logout");
      }

      if (authHelper.authToken()) {
        this.context.commit("authorized");
        Socket.emit("Auth/authorize", authHelper.authToken());
      }
    } catch (e) {
      console.log(e);
      this.context.commit("logout");
    }
  }
}
