
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/boards">Boards</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue from "vue";
import { namespace, State, Action, Getter } from "vuex-class";
import { AppState } from "./store/state";

const Store = namespace("Boards");

export default class App extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Store.Action fetchBoards: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $Progress: any;
  appHeight = () =>
    document.documentElement.style.setProperty(
      "--app-height",
      `${window.innerHeight}px`
    );

  created() {
    this.load();
  }

  mounted() {
    this.showInstallMessage();
    window.addEventListener("resize", this.appHeight);
    this.appHeight();
  }

  async load() {
    this.$Progress.start();
    await this.fetchBoards();
    this.$Progress.finish();
  }

  showInstallMessage() {
    // Detects if device is on iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };
    // Detects if device is in standalone mode
    const isInStandaloneMode = () =>
      "standalone" in window.navigator && this.isStandalone(window);

    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode()) {
      window.console.log("show install message");
      // this.setState({ showInstallMessage: true });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isStandalone = (window: any) => window.navigator.standalone;
}
</script>
<style lang="scss">
html {
  height: 100vh;
  height: var(--app-height);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
