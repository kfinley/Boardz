
<template>
  <div>
    <h1>Add Board</h1>
    <form id="form" @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          ref="name"
          v-model="name"
          type="text"
          name="name"
          class="form-control"
          :class="{ 'is-invalid': submitted && !name }"
        />
        <div v-show="submitted && !name" class="invalid-feedback">
          Name is required
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Save</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Board } from "../entities";
import { entitiesModule } from "entities/src/index";

@Component({})
export default class AddBoards extends Vue {
  name = "";
  submitted = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $Progress: any;

  mounted() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.$refs.name as any).focus();
  }

  async onSubmit() {
    //const isValid = await this.$refs.validationObserver.validate();
    //if (isValid) {
    this.$Progress.start();

    // uppercase is due to current case enforcement on API side.
    const b = { Name: this.name };

    // We're using the ID of Boards here b/c that's the EntitySet we want updated upon save
    // Still kludgy but working
    await entitiesModule.save({ id: "Boards", type: Board.name, entity: b });

    this.$Progress.finish();
    this.$router.push({ name: "Boards" });
  }
}
</script>