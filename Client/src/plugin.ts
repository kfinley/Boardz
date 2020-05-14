import Vue, { PluginFunction, PluginObject } from "vue";
import {
  Store,
  MutationPayload,
  SubscribeActionOptions,
  ActionPayload,
} from "vuex";
import router, { Route } from "vue-router";
import VuexPersist from "vuex-persist";
import VueProgressBar from "vue-progressbar";

import { routes } from "@/router/boards";
import BoardzModule from "./store/index";
import components from "./components";

import { AppState } from "boardz";
import AuthPlugin from "auth-ui/src/plugin";

export interface BoardsPlugin extends PluginObject<BoardzPluginOptions> {
  install: PluginFunction<BoardzPluginOptions>;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface BoardzPluginOptions {
  router: router;
  store: Store<AppState>;
}

const plugin = {
  install(vue: typeof Vue, options?: BoardzPluginOptions) {
    if (options !== undefined && options.router && options.store) {

      vue.use(VueProgressBar, {
        color: "green",
        failedColor: "red",
        height: "2px",
      });

      Vue.use(AuthPlugin, {
        router: options.router,
        store: options.store
      });

      Object.keys(components).forEach((name) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Vue.component(name, (components as any)[name]);
      });
      
      options.router.addRoutes(routes);
      
      options.store.registerModule("Boards", BoardzModule);

      options.store.dispatch("Boards/setupSockets");

      const vuexLocalStorage = new VuexPersist({
        key: "boardz", // The key to store the state on in the storage provider.
        storage: window.localStorage, // or window.sessionStorage or localForage
        // Function that passes the state and returns the state with only the objects you want to store.
        // reducer: (state: { News: AppState }) => ({
        //     News: {
        //       rejected: state.News.rejected,
        //       skipped: state.News.skipped,
        //       liked: state.News.liked,
        //       showLiked: state.News.showLiked,
        //       showSkipped: state.News.showSkipped
        //     }
        // }),
        // Function that passes a mutation and lets you decide if it should update the state in localStorage.
        // filter: (mutation) => true
      });

      vuexLocalStorage.plugin(options.store);

      const waitForStorageToBeReady = async (
        to: Route,
        from: Route,
        next: Function
      ) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (options as any).store.restored;
        // window.console.log(options.store.state);
        // window.console.log("state restored");
        next();
      };

      options.router.beforeEach(waitForStorageToBeReady);

      const inBrowser = typeof window !== "undefined";
      if (inBrowser) {
        // Add in browser api
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).Boards = {
          _store: options.store,
          store: {
            subscribe: function(
              fn: (mutation: MutationPayload, state: AppState) => Function
            ) {
              return options.store.subscribe.call(options.store, fn);

              // ht - https://blog.sentry.io/2016/02/03/wrap-javascript-functions
              // copy arguments
              // var args = [].slice.call(arguments, 0);

              // arguments.length will always be same
              // return options.store.subscribe.apply(this, args);
            },
            subscribeAction: function(
              fn: SubscribeActionOptions<ActionPayload, AppState>
            ) {
              return options.store.subscribeAction.call(options.store, fn);
            },
          },
        };
      }
    }
  },
};

export default plugin as BoardsPlugin;