import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Config } from "config";
import { EntityList } from "boardz";
import { createLocalStorage } from "localstorage-ponyfill";

const localStorage = createLocalStorage();

//import axiosCookieJarSupport from "axios-cookiejar-support";
//import tough from "tough-cookie";

const protocol = `${
  process.env.NODE_ENV == "production" ? "https://" : "http://"
}`;

const baseUrl = `${protocol}${Config.Api}`;

//export const cookieJar = new tough.CookieJar();
export function authToken() : string | null{
  const token = localStorage.getItem(`${Config.Agent}:access_token`);
  return token;
}

export function authHeader() {
  const token = authToken();
  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}

export const api = {
  BaseUrl: baseUrl,
  Boards: `${baseUrl}/boards`,
  Login: `${baseUrl}/auth`,
};

//axiosCookieJarSupport(axios);
//axios.defaults.withCredentials = true;
//axios.defaults.jar = cookieJar;

export function urlFromType<T>(type: string): string {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  if (type.endsWith("s")) {
    throw "Handle plural entity names!";
  }
  return `${api.BaseUrl}/${type.toLowerCase()}s`;
}

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

export async function getList<T>(type: new () => T) {
  const url = urlFromType(type.name);

  return await request<EntityList<T>>({
    url,
    method: "GET",
  });
}

export async function get<T>(url: string) {
  return await request<T>({
    url,
    method: "GET",
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function post<T>(url: string, data: any, headers?: {}) {
  return await request<T>({
    url,
    method: "POST",
    data,
    headers,
  });
}
