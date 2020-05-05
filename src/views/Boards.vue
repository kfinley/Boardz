
<template>
  <div>
    <h1>My Boards</h1>
    <div v-if="boards">
      <template v-for="(board) in boards">{{ board.name }}</template>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue from "vue";
import { Emit, Prop, Watch, Component } from "vue-property-decorator";
import { namespace, State, Action, Getter } from "vuex-class";

import { AppState } from "../store/state";
import { Route, RawLocation } from "vue-router";
import { Board } from "../resources/types";
const Store = namespace("Boards");

@Component({})
export default class Boards extends Vue {
  @State("Boards") state!: AppState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Store.Getter boards: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Store.Action fetchBoards: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $Progress: any;

  created() {
    this.load();
  }

  async load() {
    this.$Progress.start();
    console.log("Fetching");
    await this.fetchBoards();
    console.log("done");
    this.$Progress.finish();
  }
}
</script>