import qs from "querystring";
import { Credentials, AuthResponse } from "../types";
import { api, post } from "api";

export async function authenticate(creds: Credentials): Promise<AuthResponse> {
  const data = qs.stringify({
    Email: creds.username,
    Password: creds.password,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await post<AuthResponse>(api.Auth, data, {
    // "User-Agent": Config.Agent,
    "Content-Type": "application/x-www-form-urlencoded",
  });

  if (response.status === 401) {
    // Handle bad login    
  }

  if (response.status === 200) {
    return response.data;
  }

  throw "Login Faild!";
}
