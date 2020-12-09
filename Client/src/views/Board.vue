
<template>
  <div v-if="board">
    <h2>{{ board.Name }}</h2>
    <div class="stages-wrapper">
      <entity-list :set="board.Stages">
        <template v-slot="{ entity: stage }">
          <stage :stage="stage"> </stage>
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
import { Board, Stage } from "../entities";
import { entitiesModule } from "entities/src";
import CardComponent from "../components/Card";
import StageComponent from "../components/Stage";

@Component({
  components: {
    card: CardComponent,
    stage: StageComponent,
  },
})
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

  stageAdded(stage: Stage) {
    //TODO: Move this into store
    this.board?.Stages.push(stage);
  }
}
</script>

<style scoped>
.stages-wrapper {
  min-width: 1155px;
}
</style>
