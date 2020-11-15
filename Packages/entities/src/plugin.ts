import Vue, { PluginFunction, PluginObject } from "vue";
import { Store } from "vuex";

import { configureListeners } from "./sockets/index";
import EntityModule from "./store/entity";

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

      options.appName = options.appName ?? options.store.state.appName ?? options.store.state.appName;
      
      // register Entities store module
      options.store.registerModule("Entity", EntityModule);
      
      console.log('Entity module registered');

      options.store.commit("Entity/setup", options);

      configureListeners(options.store.commit, options.socket);
      
    }
  },
};

export default plugin as EntitiesPlugin;
