import { api } from "api";

export const authApi = {
    BaseUrl: api.BaseUrl,
    Auth: `${api.BaseUrl}/auth`,
    Refresh: `${api.BaseUrl}/auth/refresh`
  };