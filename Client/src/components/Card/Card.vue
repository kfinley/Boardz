<template>
  <entity
    :entity="card"
    type="Card"
    :draggable="true"
    @entity-dropped="dropped"
  >
    <slot>
      <div class="hd-border card pp">
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
    entity: EntityComponent,
  },
})
export default class CardComponent extends Vue {
  name = "Card";
  @Prop() card!: Card;

  dropped(type: string, id: string) {
    console.log(`dropped Card ${this.card.Id} on ${type} ${id}`);

    const card = {
      Id: this.card.Id,
      Stage: type === "Stage" ? { Id: id } : null,
      Board: type == "Board" ? { Id: id } : null,
    };

    entitiesModule.save({ id: "Board", type: this.name, entity: card });
  }
}
</script>

<style scoped>
.card {
  margin: 0 auto;
  background: white;
  box-shadow: 0 8px 8px -3px rgba(0, 0, 0, 0.2),
    0 2px 6px -4px rgba(0, 0, 0, 0.14), 0 1px 6px -3px rgba(0, 0, 0, 0.12);
  min-width: 88px;
  max-width: 100px;
}

.card-header {
  font-size: 14px;
  margin: 4px;
}
</style>