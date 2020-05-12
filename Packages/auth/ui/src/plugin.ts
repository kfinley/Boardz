import Vue, { PluginFunction, PluginObject } from "vue";
import VueProgressBar from "vue-progressbar";
import router, { Route } from "vue-router";
import { Store } from "vuex";

import { AppState } from "boardz";
import { UserStatus, AuthModule } from "auth/src/store";

import pluginRoutes from "./router/pluginRoutes";
import components from "./components";

export interface AuthPlugin extends PluginObject<AuthPluginOptions> {
  install: PluginFunction<AuthPluginOptions>;
}

export interface AuthPluginOptions {
  router: router;
  store: Store<AppState>;
}

const AuthPlugin = {
    install(vue: typeof Vue, options?: AuthPluginOptions) {
        if (options !== undefined && options.router && options.store) {
          
          vue.use(VueProgressBar, {
            color: "green",
            failedColor: "red",
            height: "2px",
          });
    
          Object.keys(components).forEach((name) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Vue.component(name, (components as any)[name]);
          });

          options.router.addRoutes(pluginRoutes);

          options.router.beforeEach((to, from, next) => {
            const status = (options as any).store.state.Auth.status;
    
            if (to.meta.allowAnonymous) {
              if (status == UserStatus.LoggedIn && to.name == "Auth") next("/");
              else next();
              return;
            }
    
            switch (status) {
              case UserStatus.LoggedIn:
                if (to.name == "Auth") {
                  next({ name: "Boards" });
                  return;
                }
                next();
                return;
              case UserStatus.LoggedOut:
                if (to.name == "Auth") {
                  next();
                  return;
                }
                next({ name: "Auth" });
                return;
              case UserStatus.LoggingIn:
                options.store.commit("Auth/loginFail");
                next({ name: "Auth" });
                return;
              default:
                next({ name: "About" });
                return;
            }
          });

          // register Auth store module
          options.store.registerModule("Auth", AuthModule);
    
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
        }
    },
};


export default AuthPlugin as AuthPlugin;
