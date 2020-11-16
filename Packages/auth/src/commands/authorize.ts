import { AuthResponse } from "../types";
import { api, get } from "api";

export async function authorize(token: string): Promise<any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await get<AuthResponse>(api.Auth);

  if (response.status === 200) {
    return true;
  }

  // if (response.status === 401) {
  //   return false;
  // }

  throw `Authorize Response: ${JSON.stringify(response)}`;
}
