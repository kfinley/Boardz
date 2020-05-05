import { Config } from "@/config";

const protocol = `${
  process.env.NODE_ENV == "production" ? "https://" : "http://"
}`;

const baseUrl = `${protocol}${Config.Api}`;

export default {
  BaseUrl: baseUrl,
  Boards: `${baseUrl}/boards`,
};
