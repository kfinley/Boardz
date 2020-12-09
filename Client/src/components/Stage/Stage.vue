<template>
  <entity :entity="stage" type="Stage" droppable="true" drop-accepts=".card-entity">
    <div class="hd-border stage">
      <div class="stage-header glass">
        {{ stage.Name }}
      </div>
      <entity-list v-if="stage.Id !== undefined" :set="stage.Cards">
        <template v-slot="{ entity: card }">
          <card :card="card" />
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
  </entity>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit, Watch } from "vue-property-decorator";
import interact from "interactjs";
import { entitiesModule } from "entities/src/index";
import { Board, Stage, Card } from "../../entities";
import EntityComponent from "../Entity";
import CardComponent from "../Card";

@Component({
    components: {
        card: CardComponent,
        entity: EntityComponent
    }
})
export default class StageComponent extends Vue {
  name = "Stage";
  @Prop() stage!: Stage;

  cardAdded(card: Card) {
    //TODO: Move this into store
    (entitiesModule.entities as any).Board.result.filter((x: Board) =>
      x?.Stages?.filter((s) => s.Id === card?.Stage?.Id)[0].Cards?.push(card)
    );
  }
  
}
</script>

<style scoped>
.stage {
  padding-bottom: 10px;
  min-width: 365px;
}

</style>