<template>
  <div>
    <h2 v-if="title">{{ title }}</h2>
    <div v-if="entitySet">
      <ul class="entity-list">
        <li
          v-for="entity in entitySet.result"
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
import { EntitySet } from "../types";

const Entity = namespace("Entity");

@Component({})
export default class EntityList extends Vue {
  @Prop() private type!: string;
  @Prop() private title!: string;
  @Prop() private filters!: string;

  @Entity.State("entities")
  entities!: {};

  @Entity.Action
  refresh!: Function;

  @Entity.Action
  refreshSet!: Function;

  @Entity.Mutation
  setFilters!: Function;

  get keyName() {
    return this.type.toLowerCase() + "s";
  }

  get titleName() {
    return this.type + "s";
  }

  get entitySet() {
    return (this.entities as any)[this.keyName] as EntitySet;
  }

  created() {
    const filtersArray = [];
    if (this.filters?.indexOf(":")) {
      console.log(this.filters);
      filtersArray.push([
        this.filters.split(":")[0],
        this.filters.split(":")[1],
      ]);
    }
    this.setFilters({ name: this.type, filters: JSON.stringify(filtersArray) });
  }

  mounted() {
    console.log(this);
    const refreshParams = { params: { type: { name: this.type }, view: "" } };
    //this.refreshSet(refreshParams);
    this.refresh({ name: this.type });
  }
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
