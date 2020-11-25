
<template>
  <div v-if="board">
    <h2>{{ board.Name }} Board</h2>
    <div class="stage-wrapper">
      <entity-list type="Stage" :filters="`Board.Id:${board.Id}`">
        <template v-slot="{ entity: stage }">
          <div class="hd-border stage">
            <div class="stage-header">
              {{ stage.Name }}
            </div>
            <entity-list type="Card" :filters="`Stage.Id:${stage.Id}`">
              <template v-slot="{ entity: card }">
                <div class="hd-border card">
                  <div class="card-header">
                    {{ card.Title }}
                  </div>
                </div>
              </template>
            </entity-list>
          </div>
        </template>
      </entity-list>
    </div>
    <form>
      <div class="form-group">
        <button
          v-if="!showAddStage"
          class="btn btn-primary"
          @click.prevent="toggleAdd"
        >
          Add Stage
        </button>
        <div v-if="showAddStage" class="add-stage-wrapper">
          <input
            ref="stageName"
            v-model="stageName"
            class="name-input"
            type="text"
            name="stageName"
            placeholder="Enter stage name..."
            autocomplete="off"
            dir="auto"
            maxlength="512"
          />
          <div class="add-controls clearfix">
            <button class="add-button" @click.prevent="addStage">
              Add Stage
            </button>
            <a class="icon-lg left" href="#" @click.prevent="toggleAdd">X</a>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Board } from "../entities";
import { EntitySet } from "entities";
import { Stage } from "../entities";

const Entity = namespace("Entity");

@Component({})
export default class BoardView extends Vue {
  stageName = "";

  private showAddStage = false;

  @Entity.State("entities")
  entities!: { boards: { set: [] } };

  @Entity.Action
  save!: Function;

  @Entity.Action
  get!: Function;

  get nameSlug() {
    return this.$route.params.nameSlug;
  }

  get board(): Board | null {
    return this.entities.boards.set?.filter(
      (x) => (x as any)["Name"].replace(" ", "-") === this.nameSlug
    )[0] as Board;
  }

  toggleAdd() {
    this.showAddStage = !this.showAddStage;
    if (this.showAddStage) {
      window.setTimeout(() => (this.$refs.stageName as any).focus(), 500);
    }
  }

  addStage() {
    const stage = {
      Name: this.stageName,
      Board: {
        Id: this.board?.Id,
      },
    };

    this.save({ type: Stage, entity: stage });
    this.toggleAdd();
    this.stageName = "";
  }

  created() {
    const filters = `Name:${this.nameSlug.replace("-", " ")}`;
    this.get({ name: "Board", filters });
  }
}
</script>

<style>
.card {
  margin: 5px;
}

.add-stage-wrapper {
  width: 98%;
}

.name-input {
  background-color: #fff;
  box-shadow: inset 0 0 0 2px #0079bf;
  display: block;
  margin: 0;
  transition: margin 85ms ease-in, background 85ms ease-in;
  width: 100%;
}

.add-controls {
  height: 32px;
  transition: margin 85ms ease-in, height 85ms ease-in;
  overflow: hidden;
  margin: 4px 0 0;
}

.add-button {
  float: left;
  min-height: 32px;
  font-size: 16px;
  height: 32px;
  margin-top: 0;
  padding-top: 4px;
  padding-bottom: 4px;
}

.clearfix:after {
  clear: both;
  content: "";
  display: table;
}

.icon-lg,
.icon-md,
.icon-sm {
  color: #42526e;
}

.icon-lg,
.icon-md {
  height: 32px;
  line-height: 32px;
  width: 32px;
}

.icon-lg {
  font-size: 24px;
}

.icon-lg,
.icon-md,
.icon-sm {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  text-align: center;
  text-decoration: none;
  vertical-align: bottom;
}

.left {
  float: left;
}
</style>
