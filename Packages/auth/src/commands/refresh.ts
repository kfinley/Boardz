import { AuthResponse } from "../types";
import { api, get } from "api";

export async function refresh(): Promise<any> {
  
  const response = await get<AuthResponse>(api.Refresh);

  if (response.status === 200) {
    return response.data;
  }

  throw `Authorize Response: ${JSON.stringify(response)}`;
}
