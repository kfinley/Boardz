import Vue, { PluginFunction, PluginObject } from "vue";
import { Store } from "vuex";

import { configureListeners } from "./sockets/index";
import EntityModule from "./store/entity";
import components from "./components";

export interface EntitiesPlugin extends PluginObject<EntitiesPluginOptions> {
  install: PluginFunction<EntitiesPluginOptions>;
}

export interface EntitiesPluginOptions {
  appName: string;
  store: Store<any>;
  socket: any;
}

const plugin = {
  install(vue: typeof Vue, options?: EntitiesPluginOptions) {
    if (options !== undefined && options.store) {
      options.appName =
        options.appName ??
        options.store.state.appName ??
        options.store.state.appName;

      Object.keys(components).forEach((name) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Vue.component(name, (components as any)[name]);
      });

      // register Entities store module
      options.store.registerModule("Entity", EntityModule);

      console.log("Entity module registered");

      options.store.commit("Entity/setup", options);

      configureListeners(options.store.commit, options.socket);
    }
  },
};

export default plugin as EntitiesPlugin;
