<template>
  <entity :entity="card" type="Card" :draggable="true" @entity-dropped="dropped">
    <slot>
      <div class="hd-border card">
        <div class="card-header">
          {{ card.Title }}
        </div>
      </div>
    </slot>
  </entity>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit, Watch } from "vue-property-decorator";
import { Card, Stage } from "../../entities";
import EntityComponent from "../Entity";
import { entitiesModule } from "entities/src";

@Component({
    components: {
        entity: EntityComponent
    }
})
export default class CardComponent extends Vue {
  name = "Card";
  @Prop() card!: Card;

  dropped(id: string) {
    console.log(`dropped Card ${this.card.Id} on Stage ${id}`);
    
    const card = {
      Id: this.card.Id,
      Stage: {
        Id: id
      }
    }
    entitiesModule.save({ id: "Board", type: this.name, entity: card});
  }
}
</script>

<style scoped>
.card {
  margin: 5px;
  background: white;
}
</style>