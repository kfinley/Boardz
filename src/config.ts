export interface Configuration {
  Api: string;
}

const config: Configuration = {
    Api: process.env.VUE_APP_BOARDZ_API as string,
}

export const Config = config;