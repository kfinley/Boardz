
<template>
  <div>
    <h2>Boardz Login</h2>
    <form id="form" @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          ref="username"
          v-model="username"          
          type="text"          
          name="username"
          class="form-control"
          :class="{ 'is-invalid': submitted && !username }"
        />
        <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="password"
          type="password"
          name="password"
          class="form-control"
          :class="{ 'is-invalid': submitted && !password }"
        />
        <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
      </div>
      <div class="form-group">
        <button v-show="!disabled" class="btn btn-primary" :disabled="disabled">Login</button>
        <img
          v-show="disabled"
          src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
        />
        <!-- <router-link to="/register" class="btn btn-link">Register</router-link> -->
      </div>
    </form>
  </div>
</template>

<script lang="ts">
//import Vue from "vue";
import { namespace, State } from "vuex-class";
import { UserState, UserStatus } from "boardz";
import { Component, Watch, Vue } from "vue-property-decorator";

const Store = namespace("Auth");

@Component
export default class Login extends Vue {
  @State("Auth") state!: UserState;

  @Store.Action login!: Function;

  username = "";
  password = "";
  submitted = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $Progress: any;
  
  mounted() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.$refs.username as any).focus();
   }

  async onSubmit() {
    //const isValid = await this.$refs.validationObserver.validate();
    //if (isValid) {
    this.$Progress.start();    
      await this.login({
        username: this.username,
        password: this.password
      });    
    this.password = "";
    this.$Progress.finish();
  }

  @Watch("state.status")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onLoggedIn(newValue: UserStatus, oldValue: UserStatus) {
    
    if (newValue === UserStatus.LoggedIn) {
      if (this.$route.query && this.$route.query.returnUrl) {
        this.$router.push(this.$route.query.returnUrl as string);
      } else {
        this.$router.push({ name: "Boards" });
      }
    }
  }

  get disabled() {
    const status = this.state.status;
    return status === UserStatus.LoggingIn ||
          status === UserStatus.LoggedIn;
  }
}
</script>

<style>
</style>