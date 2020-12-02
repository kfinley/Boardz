
<template>
  <div v-if="board">
    <h2>{{ board.Name }} Board</h2>
    <div class="stage-wrapper">
      <entity-list :set="board.Stages">
        <template v-slot="{ entity: stage }">
          <div class="hd-border stage">
            <div class="stage-header">
              {{ stage.Name }}
            </div>
            <entity-list :set="stage.Cards">
              <template v-slot="{ entity: card }">
                <div class="hd-border card">
                  <div class="card-header">
                    {{ card.Title }}
                  </div>
                </div>
              </template>
              <template v-slot:footer>
                <!-- add-entity should emit the entity that was added and then handle what to do with it here. -->
                <add-entity
                  type="Card"
                  properties="Title"
                  :default-values="{ Stage: { Id: `${stage.Id}` } }"
                ></add-entity>
              </template>
            </entity-list>
          </div>
        </template>
      </entity-list>
    </div>
    <add-entity
      type="Stage"
      properties="Name"
      :default-values="{ Board: { Id: `${board.Id}` } }"
    ></add-entity>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Board } from "../entities";
import { entitiesModule } from "entities/src/index";

@Component({})
export default class BoardView extends Vue {
  get nameSlug() {
    return this.$route.params.nameSlug;
  }

  get board(): Board | null {
    //TODO: move this to store
    if ((entitiesModule.entities as any).Board !== undefined) {
      return (entitiesModule.entities as any).Board.result?.filter(
        (x: object) =>
          ((x as any)["Name"] as string).replace(" ", "-") === this.nameSlug
      )[0] as Board;
    }
    return null;
  }

  created() {
    const filters = `Name:${this.nameSlug.replace("-", " ")}`;
    const properties = `Name,Stages`;
    entitiesModule.get({ type: "Board", filters, properties });
  }
}
</script>

<style>
.card {
  margin: 5px;
}
</style>
