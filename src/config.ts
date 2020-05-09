export interface Configuration {
  Host: string;
  Agent: string;
  Api: string;
  ServiceWorkerPath: string;
}

const config: Configuration = {
  Host: process.env.VUE_APP_BOARDZ_HOST as string,  
  Agent: process.env.VUE_APP_BOARDZ_AGENT as string,
  Api: process.env.VUE_APP_BOARDZ_API as string,
  ServiceWorkerPath: process.env.VUE_APP_SERVICE_WORKER_PATH as string
}

export const Config = config;