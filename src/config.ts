export interface Configuration {
  Host: string;
  Agent: string;
  Api: string;
}

const config: Configuration = {
  Host: process.env.VUE_APP_BOARDZ_HOST as string,  
  Agent: process.env.VUE_APP_BOARDZ_AGENT as string,
  Api: process.env.VUE_APP_BOARDZ_API as string,
}

export const Config = config;