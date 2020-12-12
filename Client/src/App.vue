
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Boardz</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view id="content" />
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

body {
  min-height: 100vh;
  background-attachment: fixed;
  margin: 0;
  padding: 0;
}

#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: x-large;
  color: #2c3e50;
  height: 100vh;
}
input,
textarea {
  font-size: medium;
}
button.small {
  font-size: small;
}
button.large {
  font-size: large;
}
button.larger {
  font-size: larger;
}
button.x-large {
  font-size: x-large;
}
button.xx-large {
  font-size: xx-large;
}
button.xxx-large {
  font-size: 43px;
}
form * {
  padding: 5px;
}
button {
  background: #4d469b;
  box-shadow: 0 8px 8px -3px rgba(0, 0, 0, 0.2),
    0 2px 6px -4px rgba(0, 0, 0, 0.14), 0 1px 6px -3px rgba(0, 0, 0, 0.12);
  -webkit-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;
  &:active {
    transform: translateY(3px);
  }
}
#nav {
  padding: 15px;
  height: 35px;
  a {
    font-weight: bold;
    color: #7171c9;

    &.router-link-exact-active {
      color: #0ca4f5;
    }
  }
}

#content {
  height: calc(100vh - 95px);
}
.pp {
  -webkit-hyphens: auto;
  -webkit-hyphenate-limit-before: 3;
  -webkit-hyphenate-limit-after: 3;
  -webkit-hyphenate-limit-chars: 6 3 3;
  -webkit-hyphenate-limit-last: always;
  -webkit-hyphenate-limit-zone: 8%;

  -moz-hyphens: auto;
  -moz-hyphenate-limit-chars: 6 3 3;
  -moz-hyphenate-limit-lined: 2;
  -moz-hyphenate-limit-last: always;
  -moz-hyphenate-limit: 8%;

  -ms-hyphens: auto;
  -ms-hyphens-limit-chars: 6 3 3;
  -ms-hyphens-limit-lines: 2;
  -ms-hyphens-limit-last: always;
  -ms-hyphens-limit-zone: 8%;

  hyphens: auto;
  hyphenate-limit-chars: 6 3 3;
  hyphenate-limit-lies: 2;
  hyphenate-limit-last: always;
  hyphenate-limit-zone: 8%;
}

.glass {
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 255px 100px 225px 100px/100px 225px 100px 255px;
  /* Above is shorthand for: */
  // border-top-left-radius: 225px 100px;
  // border-top-right-radius: 100px 225px;
  // border-bottom-right-radius: 225px 100px;
  // border-bottom-left-radius: 100px 225px;
  margin: 15px 15px 5px 10px;
  padding: 5px;
  height: 110%;
  position: relative;
  z-index: 1;
  background: inherit;
  // overflow: hidden;
}

.glass:before {
  content: "";
  position: absolute;
  background: inherit;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
  filter: blur(10px);
  margin: -20px;
}
</style>
