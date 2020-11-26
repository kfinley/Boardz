import { AuthResponse } from "../types";
import { authApi } from "../authApi";
import { get } from "api";

export async function refresh(): Promise<any> {
  
  const response = await get<AuthResponse>(authApi.Refresh);

  if (response.status === 200) {
    return response.data;
  }

  throw `Authorize Response: ${JSON.stringify(response)}`;
}
