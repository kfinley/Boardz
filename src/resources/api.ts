import { Config } from "@/config";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
//import axiosCookieJarSupport from "axios-cookiejar-support";
//import tough from "tough-cookie";

const protocol = `${
  process.env.NODE_ENV == "production" ? "https://" : "http://"
}`;

const baseUrl = `${protocol}${Config.Api}`;

//export const cookieJar = new tough.CookieJar();

export function authHeader() {
  const token = localStorage.getItem(`${Config.Agent}:access_token`);

  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}

export default {
  BaseUrl: baseUrl,
  Boards: `${baseUrl}/boards`,
  Login: `${baseUrl}/auth`,
};

//axiosCookieJarSupport(axios);
//axios.defaults.withCredentials = true;
//axios.defaults.jar = cookieJar;

export async function request<T>(
  cfg: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  // await get Access Token from store
  // Build up config

  cfg.headers = { ...cfg.headers, ...authHeader() };
  //cfg.headers["user-agent"] = `${navigator.userAgent} ${Config.Agent}`;

  //console.log(cfg);
  //console.log(document.cookie);
  return await axios.request(cfg);
}

export async function get<T>(url: string) {
  return await request<T>({
    url,
    method: "GET"
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function post<T>(url: string, data: any, headers?: {}) {
  return await request<T>({
    url,
    method: "POST",
    data,
    headers
  });
}