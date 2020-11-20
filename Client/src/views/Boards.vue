<template>
  <div>
    <entity-list type="Board">
      <template slot-scope="{ entity }">
        <a :href="link(entity)" class="hd-border board">
          <div class="board-details">
            <div :title="entity.Name" dir="auto" class="board-name">
              <div>{{ entity.Name }}</div>
            </div>
            <div class="board-details-container">
              <span class="board-attributes"></span>
            </div>
          </div>
        </a>
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
import { Board } from "../entities";

@Component({})
export default class Boards extends Vue {
  addBoard() {
    this.$router.push({ name: "AddBoard" });
  }
  link(entity: Board) {
    return `/board/${entity.Name.replace(' ', '-')}`;
  }
}
</script>

<style scoped>
.board {
  background-color: rgba(122, 65, 255, 0.81);
  display: block;
  background-size: cover;
  background-position: 50%;
  color: #fff;
  line-height: 20px;
  padding: 8px;
  position: relative;
  text-decoration: none;
}
.board-details {
  display: flex;
  height: 80px;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
}
.board-name {
  flex: 0 0 auto;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: .07em;
  display: inline-block;
  overflow: hidden;
  max-height: 40px;
  width: 100%;
  word-wrap: break-word;
}
.board-name.div {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 2;
}
.board-details-container {
  flex: 0 0 auto;
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
}
.board-attributes {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  margin-left: 4px;
  overflow: hidden;
  position: relative;
  right: -4px;
}
</style>