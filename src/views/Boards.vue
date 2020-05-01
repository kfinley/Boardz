<template>
  <div>
    <h1>My Boards</h1>
    <!-- <div v-if="myBoards">
       <template v-for="(board, index) in myBoards"></template> 
    </div> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Emit, Prop, Watch, Component } from "vue-property-decorator";
import { namespace, State, Action, Getter } from "vuex-class";

import { AppState } from "../store/state";
import { Route, RawLocation } from "vue-router";
const Store = namespace("Boards");

@Component({})
export default class Boards extends Vue {
  @State("Boards") state!: AppState;
  @Store.Getter boards: unknown;

  // async create() {

  // }
}
</script>