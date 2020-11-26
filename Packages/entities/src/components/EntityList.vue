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
  @Prop() private set!: EntitySet;
  @Prop() private title!: string;
  @Prop() private filters!: string;
  @Prop() private properties!: string;

  @Entity.State("entities")
  entities!: {};

  @Entity.Action
  refresh!: Function;

  @Entity.Action
  refreshSet!: Function;

  @Entity.Mutation
  setFilters!: Function;

  @Entity.Mutation
  setProperties!: Function;

  @Entity.Action
  removeSet!: Function;

  getKeyName() {
    return this.type.toLowerCase() + "s";
  }

  get titleName() {
    return this.type + "s";
  }

  get entitySet() {
    if (this.set !== undefined) {
      return this.set;
    }

    const sets = (this.entities as any)[this.getKeyName()];
    if (sets !== undefined) {
      return sets[(this as any)._uid] as EntitySet;
    }

    return null;
  }

  created() {
    if (this.set === undefined) {
      this.setFilters({
        name: this.type,
        id: (this as any)._uid,
        filters: this.filters,
      });
      this.setProperties({
        name: this.type,
        id: (this as any)._uid,
        properties: this.properties,
      });
    }
  }

  mounted() {
    if (this.set === undefined) {
      const refreshParams = {
        type: { name: this.type },
        id: (this as any)._uid,
      };
      this.refreshSet(refreshParams);
    }
  }

  destroyed() {
    if (this.set === undefined)
      window.setTimeout(() => {
        this.removeSet({ type: { name: this.type }, id: (this as any)._uid });
      }, 100);
  }
}
</script>

<style>
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
