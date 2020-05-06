
<template>
  <div>
    <h1>My Boards</h1>
    <div v-if="boards">
      <ul>
        <li v-for="(board) in boards" :key="board.name">{{ board.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { AppState, state } from "../store/state";

const Store = namespace("Boards");

@Component({})
export default class Boards extends Vue {
  @State("Boards") state!: AppState;

  @Store.Getter boards!: typeof state.allBoards;
  @Store.Action fetchBoards!: Function;

  created() {
    this.load().then(() => {
      return;
    });
  }

  async load() {
    this.$Progress.start();
    await this.fetchBoards();
    this.$Progress.finish();
  }
}
</script>