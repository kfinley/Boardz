
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/boards">Boardz</router-link> |
      <router-link to="/about">About</router-link>
    </div>

    <router-view />
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue from "vue";
import { namespace, State } from "vuex-class";
import { AppState } from "./store";

const Store = namespace("Boards");

export default class App extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $Progress: any;

  appHeight = () =>
    document.documentElement.style.setProperty(
      "--app-height",
      `${window.innerHeight}px`
    );

  mounted() {
    this.showInstallMessage();
    window.addEventListener("resize", this.appHeight);
    this.appHeight();
  }

  //TODO: move this out to it's own module
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

<style>
@import "./assets/handdrawn.css";
</style>

<style lang="scss">
/* linear-gradient(135deg, rgb(120, 49, 146), rgb(89, 188, 200) 75%) */
/* purple #783192 */
html {
  height: 100vh;
  height: var(--app-height);
}
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: x-large;
  color: #2c3e50;
}
input,
textarea {
  font-size: medium;
}
button {
  font-size: xx-large;
}
form * {
  padding: 5px;
}
button {
  background: #4d469b;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #7171c9;

    &.router-link-exact-active {
      color: #0ca4f5;
    }
  }
}
</style>
