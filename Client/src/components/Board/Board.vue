
<template>
  <entity
    v-if="board"
    class="board"
    :entity="board"
    type="Board"
    droppable="true"
    drop-accepts=".card-entity"
    :drop-handler="handleCardDrop"
  >
    <div class="header-wrapper">
      <div class="controls-left"></div>
      <div class="header-title">{{ board.Name }}</div>
      <div class="controls-right">
        <add-entity
          id="Board"
          type="Stage"
          properties="Name"
          :default-values="{ Board: { Id: `${board.Id}` } }"
          @entity-added="stageAdded"
        ></add-entity>
      </div>
    </div>
      
    <div class="stages-wrapper">
      <entity-list :set="board.Stages">
        <template v-slot="{ entity: stage }">
          <stage :stage="stage"> </stage>
        </template>
      </entity-list>
    </div>

    <div v-if="board.Cards.length > 0" class="cards">
      <entity-list :set="board.Cards">
        <template v-slot="{ entity: card }">
          <card :card="card" />
        </template>
      </entity-list>
    </div>
  </entity>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Board, Stage } from "../../entities";
import { entitiesModule } from "entities/src";
import CardComponent from "../Card";
import StageComponent from "../Stage";
import EntityComponent from "../Entity";

@Component({
  components: {
    card: CardComponent,
    entity: EntityComponent,
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
    const properties = `Name,Stages,Cards`;
    entitiesModule.get({ type: "Board", filters, properties });
  }

  stageAdded(stage: Stage) {
    //TODO: Move this into store
    this.board?.Stages.push(stage);
  }

  handleCardDrop(event: Interact.InteractEvent) {
    return {
      emit: !this.board?.Cards?.some(
        (x) => x.Id === (event.relatedTarget as any).id
      ),
      move: false,
    };
  }
}
</script>

<style scoped>
.board {
  height: calc(100vh - 95px);
  position: relative;
}
.stages-wrapper {
  min-width: 1155px;
}
.cards {
  margin: 20px;
}
.header-wrapper {
  display: flex;
  overflow: hidden;
  padding: 6px;
  box-sizing: border-box;
}
.controls-left {
  display: flex;
  flex-grow: 1;
  flex-basis: 100%;
  justify-content: flex-start;
}
.header-title {
  display: block;
  position: relative;
  flex-shrink: 0;
  height: 40px;
  margin-top: 2px;
}

.controls-right>button {
  float: right;
  margin-right: 35px;
}

.controls-right>form {
  margin-right: 35px;
}

.controls-right {
  display: flex;  
  flex-grow: 1;
  flex-basis: 100%;
  justify-content: flex-end;  
}

</style>
