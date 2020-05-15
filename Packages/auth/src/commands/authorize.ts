import qs from "querystring";
import { Credentials, AuthResponse } from "../types";
import { Config } from "config";
import { AppUser } from "boardz";
import { api, post } from "api";
import { createLocalStorage } from "localstorage-ponyfill";

const localStorage = createLocalStorage();

export async function authorize(creds: Credentials): Promise<AppUser> {
  const data = qs.stringify({
    Email: creds.username,
    Password: creds.password,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await post<AuthResponse>(api.Login, data, {
    // "User-Agent": Config.Agent,
    "Content-Type": "application/x-www-form-urlencoded",
  });

  if (response.status === 401) {
    // Handle bad login
    //console.log("Invalid Login");
    return { username: "" };
  }

  if (response.status === 200) {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    localStorage.setItem(
      `${Config.Agent}:access_token`,
      response.data.AccessToken
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    localStorage.setItem(
      `${Config.Agent}:refresh_token`,
      response.data.RefreshToken
    );

    return { username: creds.username };
  }

  throw "Login Faild!";
}
