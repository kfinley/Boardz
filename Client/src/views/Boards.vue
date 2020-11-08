
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
import { AppState, Board } from "boardz";

const Store = namespace("Boards");

@Component({})
export default class Boards extends Vue {
  @State("Boards") state!: AppState;

  @Store.Getter boards!: Board[];

}
</script>