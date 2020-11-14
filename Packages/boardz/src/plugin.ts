import Vue, { PluginFunction, PluginObject } from "vue";
import { Store } from "vuex";

import { configureListeners } from "./sockets/index";
import EntitiesModule from "./store/entity";

export interface BoardzPlugin extends PluginObject<BoardzPluginOptions> {
  install: PluginFunction<BoardzPluginOptions>;
}

export interface BoardzPluginOptions {
  appName: string;
  store: Store<any>;
  socket: any;
}

const plugin = {
  install(vue: typeof Vue, options?: BoardzPluginOptions) {
    if (options !== undefined && options.store) {

      options.appName = options.appName ?? options.store.state.appName ?? options.store.state.appName;
      
      // register Entities store module
      options.store.registerModule("Entity", EntitiesModule);
      
      console.log('Entity module registered');

      options.store.commit("Entity/setup", options);

      configureListeners(options.store.commit, options.socket);
      
    }
  },
};

export default plugin as BoardzPlugin;
