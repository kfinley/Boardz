
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
            <entity-list v-if="stage.Id !== undefined" :set="stage.Cards">
              <template v-slot="{ entity: card }">
                <div class="hd-border card">
                  <div class="card-header">
                    {{ card.Title }}
                  </div>
                </div>
              </template>
              <template v-slot:footer>
                <add-entity
                  id="Board"
                  type="Card"
                  properties="Title"
                  :default-values="{ Stage: { Id: `${stage.Id}` } }"
                  @entity-added="cardAdded"
                ></add-entity>
              </template>
            </entity-list>
          </div>
        </template>
      </entity-list>
    </div>
    <add-entity
      id="Board"
      type="Stage"
      properties="Name"
      :default-values="{ Board: { Id: `${board.Id}` } }"
      @entity-added="stageAdded"
    ></add-entity>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Board, Stage, Card } from "../entities";
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

  cardAdded(card: Card) {
    //TODO: Move this into store
    (entitiesModule.entities as any).Board.result.filter((x: Board) =>
      x.Stages?.filter((s) => s.Id === card?.Stage?.Id)[0].Cards.push(card)
    );
  }

  stageAdded(stage: Stage) {
    //TODO: Move this into store
    this.board?.Stages.push(stage);
  }
}
</script>

<style>
.card {
  margin: 5px;
}
</style>
