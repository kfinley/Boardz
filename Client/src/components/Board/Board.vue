
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
      <div class="controls-left">
        <router-link to="/">All Boardz</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <div class="header-title">{{ board.Name }}</div>
      <div class="controls-right">
        <add-entity
          id="Board"
          type="Card"
          properties="Title"
          float="true"
          :default-values="{ Board: { Id: `${board.Id}` } }"
          @entity-added="cardAdded"
          @toggle="toggleControls"
        >
        </add-entity>
        <add-entity
          id="Board"
          type="Stage"
          properties="Name"
          float="true"
          :default-values="{ Board: { Id: `${board.Id}` } }"
          @entity-added="stageAdded"
          @toggle="toggleControls"
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
import { Board, Card, Stage } from "../../entities";
import { entitiesModule } from "entities/src";
import CardComponent from "../Card";
import StageComponent from "../Stage";
import EntityComponent from "../Entity";

@Component({
  components: {
    card: CardComponent,
    entity: EntityComponent,
    stage: StageComponent
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
    this.board?.Stages.push(stage);
  }

  cardAdded(card: Card) {
    this.board?.Cards.push(card);
  }

  toggleControls(e: any) {
    document
      .querySelectorAll<HTMLElement>(".controls-right > button")
      .forEach((e) => {
        if (e.style.display === "none") e.style.display = "";
        else e.style.display = "none";
      });
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

<style lang="scss" scoped>
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
  margin-top: 10px;
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
  font-size: xx-large;
  font-weight: bold;
  margin-top: 2px;
}

.controls-right > button {
  float: right;
  margin-right: 35px;
}

.controls-right > form {
  margin-right: 35px;
}

.controls-right {
  display: flex;
  flex-grow: 1;
  flex-basis: 100%;
  justify-content: flex-end;
}

.controls-left {
  padding: 15px;
  height: 35px;
  a {
    font-weight: bold;
    text-decoration: none;
    padding-left: 15px;
    padding-right: 15px;
    color: #7171c9;

    &.router-link-exact-active {
      color: #0ca4f5;
    }
  }
}
</style>
