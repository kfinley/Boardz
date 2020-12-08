<template>
  <draggable
    v-if="draggable"
    :maxRotation="DraggableProps.maxRotation"
    :xThreshold="DraggableProps.xThreshold"
    :yThreshold="DraggableProps.yThreshold"
    :type="type"
  >
    <slot> </slot>
  </draggable>
  <div v-else>
    <slot> </slot>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";
import interact from "interactjs";
import Draggable, { DraggableProps } from "../Draggable";

@Component({
  components: {
    Draggable,
  },
})
export default class EntityComponent extends Vue {
  name = "Entity";
  @Prop() entity!: { Id: string };
  @Prop() type!: string;
  @Prop() draggable!: boolean;
  @Prop({
    default: () => {
      return {
        maxRotation: 10,
        xThreshold: 50,
        yThreshold: 50,
      };
    },
  })
  DraggableProps!: DraggableProps;
  @Prop({ default: false }) droppable!: boolean;
  @Prop() dropAccepts!: string;

  mounted() {
    const id = (this as any)._uid;
    this.$el.id = this.entity.Id;
    if (this.droppable) {
      this.$el.classList.add("entity-dropzone");

      interact(this.$el as Interact.Target).dropzone({
        accept: this.dropAccepts,
        overlap: 0.75,
        ondrop: this.onDrop,        
      });
    }
  }
  onDrop(event: Interact.InteractEvent) {
    // interactJs isn't aware of Vue so 'this' is root context
    // so dig back down to the entity element
    const sourceId = (event as any).relatedTarget.id;
    const source = this.$root.$el.querySelector(this.cleanSelector(`#${sourceId}`));
    // source is now the draggable element inside the entity
    // emitting on parent is correct here.
    (source as any).__vue__.$parent.$emit(
      "entity-dropped",
      event.target.id
    );
  }

  // Deal with number leading Ids
  // https://stackoverflow.com/a/61637142/2344354
  cleanSelector = function(selector: string){
    (selector.match(/(#[0-9][^\s:,]*)/g) || []).forEach(function(n: any){
        selector = selector.replace(n, '[id="' + n.replace("#", "") + '"]');
    });
    return selector;
};
}
</script>
<style scoped>
</style>