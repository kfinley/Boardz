import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Config } from "config";
import { EntityResult } from "entities";
import { createLocalStorage } from "localstorage-ponyfill";
import { GetAllEntitiesRequest, SortDirection } from "./types";

const localStorage = createLocalStorage();

//import axiosCookieJarSupport from "axios-cookiejar-support";
//import tough from "tough-cookie";

const protocol = `${
  process.env.NODE_ENV == "production" ? "https://" : "http://"
}`;

const baseUrl = `${protocol}${Config.Api}`;

export const authHelper = {
  authToken: () => {
    const token = localStorage.getItem(`${Config.Agent}:access_token`);
    return token;
  },
  authHeader: () => {
    const token = authHelper.authToken();
    if (token) {
      return { Authorization: "Bearer " + token };
    } else {
      return {};
    }
  },
};

//export const cookieJar = new tough.CookieJar();
// export function authToken() : string | null{
//   const token = localStorage.getItem(`${Config.Agent}:access_token`);
//   return token;
// }

// export function authHeader() {
//   const token = authToken();
//   if (token) {
//     return { Authorization: "Bearer " + token };
//   } else {
//     return {};
//   }
// }

export const api = {
  BaseUrl: baseUrl,
  Boards: `${baseUrl}/boards`,
  Auth: `${baseUrl}/auth`,
};

//axiosCookieJarSupport(axios);
//axios.defaults.withCredentials = true;
//axios.defaults.jar = cookieJar;

function urlFromType(type: string): string {
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

  cfg.headers = { ...cfg.headers, ...authHelper.authHeader() };
  //cfg.headers["user-agent"] = `${navigator.userAgent} ${Config.Agent}`;

  console.log(`api.request: ${cfg.method} ${cfg.url}`);
  
  //console.log(document.cookie);
  return await axios.request(cfg);
}

export async function save(typeName: string, entity: any) {
  console.log(typeName);
  const url = urlFromType(typeName);

  return await post(url, entity);
}

function addUrlParam(url: string, param: string, value: any): string {
  if (url.indexOf("?") === -1) {
    url = url + "?";
  } else {
    url = url + "&";
  }
  url = `${url}${param}=${value}`;
  return url;
}

export async function getEntities(req: GetAllEntitiesRequest) {
  let url = urlFromType(req.type);

  if (req.pageNumber > 0) {
    url = addUrlParam(url, "pageNumber", req.pageNumber);
  }

  if (req.pageSize !== 10) {
    url = addUrlParam(url, "pageSize", req.pageSize);
  }

  if (req.properties.length > 0) {
    let props = "";
    req.properties.forEach((prop) => {
      props = `${props}${prop},`;
    });
    url = addUrlParam(url, "properties", props.slice(0, -1));
  }

  if (req.sortDirection == SortDirection.Descending) {
    url = `${url}&sortDirection=${req.sortDirection}`;
  }

  if (req.sortBy) {
    url = `${url}&sortBy=${req.sortBy}`;
  }

  if (req.filters !== undefined) {
    url = `${url}&filters=${req.filters}`;
  }

  return await request({
    url,
    method: "GET",
  });
}

export async function getList<T>(type: new () => T) {
  const url = urlFromType(type.name);

  return await request<EntityResult<T>>({
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
