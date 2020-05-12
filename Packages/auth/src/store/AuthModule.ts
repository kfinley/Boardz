import Vue from "vue";
import Vuex from "vuex";

import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { authorize } from "../commands/auth";
import { Credentials } from "../types";
import { Socket } from "api";
import { AppUser } from "boardz";

export enum UserStatus {
  LoggedOut = "LoggedOut",
  LoggingIn = "LoggingIn",
  LoggedIn = "LoggedIn",
  LoginFailed = "LoginFailed",
  Registering = "Registering",
  Locked = "Locked",
}

export interface UserState {
  status: UserStatus;
  user?: AppUser;
}
 
Vue.use(Vuex);
const store = new Vuex.Store({});

@Module({ namespaced: true, store: store, name: "Auth" })
export class AuthModule extends VuexModule implements UserState {
  
  status = UserStatus.LoggedOut;
  user?: AppUser = undefined;

  @Mutation
  loginRequest(user: AppUser) {
    this.status = UserStatus.LoggingIn;
    this.user = user;
  }

  @Mutation
  loginSuccess(user: AppUser) {
    this.status = UserStatus.LoggedIn;
    this.user = user;
  }

  @Mutation
  loginFail() {
    this.status = UserStatus.LoginFailed;
    this.user = undefined;
  }

  @Mutation
  logout() {
    this.status = UserStatus.LoggedOut;
    this.user = undefined;
  }

  @Action
  async login(creds: Credentials): Promise<AppUser | undefined> {
    this.context.commit("loginRequest", { username: creds.username });
    try {
      const response = await authorize(creds);
      if (response) {
        this.context.commit("loginSuccess", response);
        return response;
      }
    } catch (e) {
      this.context.commit("logout");
    }
  }

  @Action
  async sendAuth(creds: Credentials) {
    this.context.commit("loginRequest", { username: creds.username });
    try {
      Socket.emit('auth', {
        creds
      });
    } catch (e) {      
      this.context.commit('logout');
    }
  }
}
