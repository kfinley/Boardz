import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Config } from "config";
import { createLocalStorage } from "localstorage-ponyfill";
import { GetAllEntitiesRequest, EntityResult, SortDirection } from "./types";

const localStorage = createLocalStorage();

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

export const api = {
  BaseUrl: baseUrl,
};

function urlFromType(type: string): string {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  if (type.endsWith("s")) {
    throw "Handle plural entity names!";
  }
  return `${api.BaseUrl}/${type.toLowerCase()}s`;
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

export async function request<T>(
  cfg: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
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

export async function getEntities(req: GetAllEntitiesRequest) {
  let url = urlFromType(req.type);

  if (req.pageNumber > 0) {
    url = addUrlParam(url, "pageNumber", req.pageNumber);
  }

  if (req.pageSize && req.pageSize !== 10) {
    url = addUrlParam(url, "pageSize", req.pageSize);
  }

  if (req.properties) {
    url = addUrlParam(url, "properties", req.properties);
  }

  if (req.sortDirection === SortDirection.Descending) {
    url = addUrlParam(url, "sortDirection", req.sortDirection);
  }

  if (req.sortBy) {
    url = addUrlParam(url, "sortBy", req.sortBy);
  }

  if (req.filters !== "") {
    url = addUrlParam(url, "filters", encodeURI(req.filters));
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
