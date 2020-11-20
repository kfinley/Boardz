import Vue, { PluginFunction, PluginObject } from "vue";
import VueProgressBar from "vue-progressbar";
import router, { Route } from "vue-router";
import { Store } from "vuex";

import { AuthStatus, configureListeners } from "auth";
import AuthModule from "./store";
import pluginRoutes from "./router/pluginRoutes";
import components from "./components";

export interface AuthPlugin extends PluginObject<AuthPluginOptions> {
  install: PluginFunction<AuthPluginOptions>;
}

export interface AuthPluginOptions {
  appName: string;
  router: router;
  store: Store<any>;
  redirectRoute: string;
}

const plugin = {
  install(vue: typeof Vue, options?: AuthPluginOptions) {
    if (options !== undefined && options.router && options.store) {
      options.redirectRoute = options.redirectRoute ?? "Home";
      options.appName =
        options.appName ??
        options.store.state.appName ??
        options.store.state.appName;
      vue.use(VueProgressBar, {
        color: "green",
        failedColor: "red",
        height: "2px",
      });

      Object.keys(components).forEach((name) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Vue.component(name, (components as any)[name]);
      });

      // register Auth store module
      options.store.registerModule("Auth", AuthModule);

      if (options.appName) {
        options.store.commit("Auth/setAppName", options.appName);
      }

      configureListeners(options.store.commit);

      options.router.addRoutes(pluginRoutes);

      options.router.beforeEach((to, from, next) => {
        if (to.meta.allowAnonymous) {
          if (
            options.store.state.Auth.status == AuthStatus.LoggedIn &&
            to.name == "Auth"
          )
            next("/");
          else next();
          return;
        }

        switch (options.store.state.Auth.status) {
          case AuthStatus.LoggingIn:
          case AuthStatus.LoginFailed:
          case AuthStatus.Refreshing:
            console.log(`beforeEach: ${to.name}`);
            options.store.commit("Auth/logout");
            next({ name: "Auth" });
            return;
          case AuthStatus.LoggedIn:
            if (to.name == "Auth") {
              next({ name: options.redirectRoute });
              return;
            }
            next();
            return;
          case AuthStatus.LoggedOut:
            if (to.name == "Auth") {
              next();
              return;
            }
            next({ name: "Auth" });
            return;
          default:
            next({ name: "About" });
            return;
        }
      });

      options.store.watch(
        (state) => options.store.state.Auth.status,
        (newValue, oldValue) => {
          if (newValue === AuthStatus.LoggedIn) {
            //TODO: Fix this...
            // if (route.query && options.route.query.returnUrl) {
            //   options.router.push(this.$route.query.returnUrl as string);
            // } else {
            options.router.push({ name: "Home" });
            //}
          } else if (newValue === AuthStatus.LoggedOut) {
            options.router.push({ name: "Auth" });
          }
        }
      );
      const waitForStorageToBeReady = async (
        to: Route,
        from: Route,
        next: Function
      ) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (options.store as any).restored;
        options.store.dispatch("Auth/authorize");
        // window.console.log(options.store.state);
        //window.console.log("state restored");
        next();
      };

      options.router.beforeEach(waitForStorageToBeReady);
    }
  },
};

export default plugin as AuthPlugin;
