<template>
  <div
    ref="interactElement"
    :class="draggableClasses"
    :style="{
      transform: transformString,
      transition: transitionString,
      opacity: opacityString,
      position: 'relative'
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit, Watch } from "vue-property-decorator";
import interact from "interactjs";
import log from "../../logger";
import { DraggableProps } from ".";

export interface InteractPosition {
  x: number;
  y: number;
  rotation: number;
}

@Component
export default class Draggable extends Vue implements DraggableProps {
  @Prop({ default: 0 }) maxRotation!: number;
  @Prop({ default: 200 }) yThreshold!: number;
  @Prop({ default: 200 }) xThreshold!: number;
  @Prop({ default: "" }) type!: string;

  isDraggable = true;
  dragged = false;
  position: InteractPosition = {
    x: 0,
    y: 0,
    rotation: 0,
  };

  mounted() {
    const element = this.$refs.interactElement as Interact.Target;

    interact(element).draggable({
      onstart: this.onStart,
      onmove: this.onMove,
      onend: this.onEnd,
    });
  }

  get transformString() {
    if (!this.isDraggable || this.dragged) {
      const { x, y, rotation } = this.position;
      return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
    }
    return "";
  }

  get transitionString() {
    if (this.isDraggable)
      return "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

    return "";
  }

  get opacityString() {
    if (!this.isDraggable) return ".69";
    return "1";
  }

  get draggableClasses() {
    const classes = { draggable: this.isDraggable, item: "true" };
    (classes as any)[`${this.type.toLowerCase()}-entity`] = true;
    return classes;
  }

  setPosition(coordinates: InteractPosition) {
    this.position = coordinates;
  }

  resetPosition() {
    this.setPosition({ x: 0, y: 0, rotation: 0 });
  }

  onStart(event: Interact.InteractEvent): void {
    this.isDraggable = false;
    // Set the target z-index to a higher value than the last dropped element
    event.target.style.zIndex = Math.ceil(new Date().getTime() / 1000).toString();
  }

  onMove(event: Interact.InteractEvent) {
    const x = (this.position.x || 0) + event.dx;
    const y = (this.position.y || 0) + event.dy;
    let rotation = this.maxRotation * (x / this.xThreshold);

    if (rotation > this.maxRotation) rotation = this.maxRotation;
    else if (rotation < -this.maxRotation) rotation = -this.maxRotation;

    this.setPosition({ x, y, rotation });
  }

  onEnd(event: Interact.InteractEvent) {
    this.isDraggable = true;
    this.dragged = true;
    this.position.rotation = 0;
  }
}
</script>

<style scoped>
.item {
  touch-action: none;
  user-select: none;
}
</style>