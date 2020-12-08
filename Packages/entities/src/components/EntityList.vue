<template>
  <div>
    <h2 v-if="title">{{ title }}</h2>
    <div v-if="entitySet">
      <ul class="entity-list">
        <li
          v-for="entity in entitySet"
          :key="entity.Id"
          class="entity-list-item"
        >
          <slot :entity="entity">
            {{ entity.Id }}
          </slot>
        </li>
      </ul>
    </div>
    <slot name="footer"> </slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EntitySet } from "../types";
import { entitiesModule } from "../store";

@Component({})
export default class EntityList extends Vue {
  @Prop() type!: string;
  @Prop() id!: string;
  @Prop() set!: [];
  @Prop() title!: string;
  @Prop() filters!: string;
  @Prop() properties!: string;
  @Prop() removeSetOnDestroy!: boolean;

  get setId() {
    return this.id ?? this.type;
  }

  get entitySet() {
    if (this.set !== undefined) {
      return this.set;
    }

    if (this.type !== undefined) {
      const set = (entitiesModule.entities as any)[this.setId] as EntitySet;
      if (set !== undefined) {
        return set.result;
      }
    }

    return null;
  }

  created() {
    if (this.set === undefined) {
      entitiesModule.get({
        id: this.setId,
        type: this.type,
        filters: this.filters,
        properties: this.properties,
      });
    }
  }

  destroyed() {
    if (this.type !== undefined && this.removeSetOnDestroy)
      window.setTimeout(() => {
        entitiesModule.removeSet({
          id: this.setId,
        });
      }, 50);
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
