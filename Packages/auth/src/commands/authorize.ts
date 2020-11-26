import { AuthResponse } from "../types";
import { authApi } from "../authApi";
import { get } from "api";

export async function authorize(): Promise<any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await get<AuthResponse>(authApi.Auth);

  if (response.status === 200) {
    return true;
  }

  throw `Authorize Response: ${JSON.stringify(response)}`;
}
