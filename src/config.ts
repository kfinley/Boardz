export interface Configuration {
  Api: string;
}

const config: Configuration = {
    Api: process.env.BOARDZ_API as string,
}

export const Config = config;