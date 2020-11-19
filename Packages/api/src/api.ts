import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Config } from "config";
import { createLocalStorage } from "localstorage-ponyfill";
import { GetAllEntitiesRequest, EntityResult, SortDirection } from "./types";

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
  refreshToken: () => {
    const token = localStorage.getItem(`${Config.Agent}:refresh_token`);
    return token;
  },
  username: () => {
    return ""; // Stub to be handled elsewhere...
  },
  authHeader: () => {
    try {
      const token = authHelper.authToken();
      if (token) {
        return { Authorization: "Bearer " + token };
      } else {
        return {
          Authorization: `${authHelper.username()} ${authHelper.refreshToken()}`,
        };
      }
    } catch (e) {
      console.log(
        `Error generating request auth headers. ${JSON.stringify(e)}`
      );
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
  Refresh: `${baseUrl}/refresh`,
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

  try {
    cfg.headers = { ...cfg.headers, ...authHelper.authHeader() };

    console.log(`api.request: ${cfg.method} ${cfg.url}`);
  } catch (e) {
    const err = { message: `Error creating request header`, error: e };
    console.log(err.message);
    throw err;
  }

  try {
    return await axios.request(cfg);
  } catch (e) {
    if (e.response) {
      // (5xx, 4xx)
      if (e.response.status === 401) {
        console.log("Unauthorized! Refresh token...");
        throw "Refresh";
      }
      console.log(`Error in api.request: ${JSON.stringify(e)}`);
      throw e;
    } else if (e.request) {
      // no response | never sent
      console.log(`Error in api.request: ${JSON.stringify(e)}`);
      throw e;
    } else {
      console.log(`Unhandled Error in api.request: ${JSON.stringify(e)}`);
      throw e;
    }
  }
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

/*
    Notes....
    
    Review error handling and axios retry
    https://www.intricatecloud.io/2020/03/how-to-handle-api-errors-in-your-web-app-using-axios/
*/
