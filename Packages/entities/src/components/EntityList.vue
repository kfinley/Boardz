<template>
  <div>
    <h1>All {{ titleName }}</h1>
    <div v-if="entities[keyName]">
      <ul>
        <li v-for="entity in entities[keyName].current" :key="entity.Id">
          <slot :entity="entity">
            {{ entity.Id }}
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const Entity = namespace("Entity");

@Component({})
export default class EntityList extends Vue {
  @Prop() private type!: string;

  @Entity.State("entities")
  entities!: {};

  @Entity.Action
  refresh!: Function;

  get keyName() {
    return this.type.toLowerCase() + "s";
  }

  get titleName() {
    return this.type + "s";
  }

  created() {
    console.log(`EntityList created: ${this.type}`);
    this.refresh({ name: this.type });
  }

  // mounted() { }
}
</script>

<style scoped></style>
