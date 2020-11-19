<template>
  <div>
    <h2>All {{ titleName }}</h2>
    <div v-if="entities[keyName]">
      <ul class="entity-list">
        <li
          v-for="entity in entities[keyName].current"
          :key="entity.Id"
          class="entity-list-item"
        >
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

<style scoped>
ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.entity-list {
  display: flex;
  flex-wrap: wrap;
}

.entity-list-item {
  width: 31.3%;
  padding: 0;
  margin: 0 2% 2% 0;
  transform: translate(0);
}
</style>
