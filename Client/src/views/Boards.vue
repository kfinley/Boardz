
<template>
  <div>
    <h1>All Boards</h1>
    <div v-if="entities['boards']">
      <ul>
        <li v-for="board in entities['boards']" :key="board.Id">
          {{ board.Name }}
        </li>
      </ul>
    </div>
    <div class="form-group">
      <button
        class="btn btn-primary"
        @click="$router.push({ name: 'AddBoard' })"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Board } from "boardz";

const Entity = namespace("Entity");

@Component({})
export default class Boards extends Vue {
  @Entity.State("entities")
  entities!: {};

  @Entity.Action
  refresh!: Function;

  created() {
    this.refresh(Board);
  }
}
</script>