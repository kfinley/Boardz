import { Credentials, AppUser, AuthResponse } from "@/resources/types";
import { api, post } from "@/resources/api";
import qs from "querystring";
import { Config } from "@/config";

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
    console.log("Invalid Login");
    return { username: "" };
  }

  if (response.status === 200) {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem(
      `${Config.Agent}:access_token`,
      response.data.AccessToken
    );

    localStorage.setItem(
      `${Config.Agent}:refresh_token`,
      response.data.RefreshToken
    );

    return { username: creds.username };
  }

  throw "Login Faild!";
}
