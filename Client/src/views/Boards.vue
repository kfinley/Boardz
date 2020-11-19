<template>
  <div>
    <entity-list type="Board">
      <template slot-scope="{ entity }">
        {{ entity.Name }}
      </template>
    </entity-list>
    <div class="form-group">
      <button class="btn btn-primary" @click="addBoard">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class Boards extends Vue {
  addBoard() {
    this.$router.push({ name: "AddBoard" });
  }
}
</script>