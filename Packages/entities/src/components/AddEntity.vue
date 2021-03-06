<template>
  <form
    v-if="showAdd"
    :class="`glass ${float ? `float` : `in-place`}`"
    :style="{ height: calcHeight, background: background }"
  >
    <div class="add-wrapper form-group">
      <input
        v-for="attr in entityAttributes"
        :key="attr"
        :ref="attr"
        class="attr-input"
        type="text"
        :name="attr"
        :placeholder="`Enter ${type} ${attr}...`"
        autocomplete="off"
        dir="auto"
        maxlength="512"
      />
      <div class="add-controls clearfix">
        <button class="add-button" @click.prevent="addEntity">
          Add {{ type }}
        </button>
        <a
          class="icon-lg left"
          href="#"
          @click.prevent="toggleAdd"
          :style="closeStyle"
          >X</a
        >
      </div>
    </div>
  </form>
  <button
    v-else
    :class="`btn btn-primary ${buttonSize}`"
    @click.prevent="toggleAdd"
  >
    Add {{ type }}
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { entitiesModule } from "../store";

@Component({})
export default class AddEntity extends Vue {
  showAdd = false;

  @Prop() type!: string;
  @Prop() id!: string;
  @Prop() properties!: string;
  @Prop() defaultValues!: {};
  @Prop({ default: "large " }) buttonSize!: string;
  @Prop({ default: "darkslateblue" }) background!: string;
  @Prop() closeColor!: string;
  @Prop({ default: false}) float!: boolean;

  get entityAttributes() {
    return this.properties.split(",");
  }

  @Emit("toggle")
  toggleAdd() {
    this.showAdd = !this.showAdd;

    if (this.showAdd) {
      this.$nextTick(() =>
        (this.$refs[this.entityAttributes[0]] as any)[0].focus()
      );
    }
  }

  @Emit("entity-added")
  addEntity() {
    const entity = {
      ...this.defaultValues,
    };

    this.entityAttributes.forEach((attr) => {
      (entity as any)[attr] = (this.$refs[attr] as any)[0].value;
    });

    entitiesModule.save({ id: this.id, type: this.type, entity });
    this.toggleAdd();
    return entity;
  }

  get calcHeight() {
    return `${45 + this.entityAttributes.length * 45}px`;
  }

  get closeStyle() {
    if (this.closeColor !== undefined) return { color: this.closeColor };
    else return "";
  }
}
</script>

<style scoped>
.add-wrapper {
  width: 98%;
}

.attr-input {
  background-color: #fff;
  box-shadow: inset 0 0 0 2px #0079bf;
  display: block;
  margin: 0;
  transition: margin 85ms ease-in, background 85ms ease-in;
  width: 90%;
}

.add-controls {
  height: 32px;
  transition: margin 85ms ease-in, height 85ms ease-in;
  overflow: hidden;
  margin: 4px 0 0;
}

.add-button {
  float: left;
  min-height: 32px;
  font-size: 16px;
  height: 32px;
  margin-top: 0;
  padding-top: 4px;
  padding-bottom: 4px;
}

.clearfix:after {
  clear: both;
  content: "";
  display: table;
}

.icon-lg,
.icon-md,
.icon-sm {
  color: #969ca5;
}

.icon-lg,
.icon-md {
  height: 32px;
  line-height: 32px;
  width: 32px;
}

.icon-lg {
  font-size: 24px;
}

.icon-lg,
.icon-md,
.icon-sm {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  text-align: center;
  text-decoration: none;
  vertical-align: bottom;
}

.left {
  float: left;
}

.float {
  position: absolute;
  z-index: 1000;
  margin: 5px 5px 5px 5px;
  padding: 0px;
  right: 3%;
}

.in-place {
  left: 6%;
  width: 80%;
  margin-bottom: 22px;
  margin-top: 20px;
}
</style>