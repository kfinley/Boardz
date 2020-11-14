import { Socket } from "socket.io-client";
import Vue from "vue";

import Vuex from "vuex";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import EntityState from "../state/entity";
import getProp from "../helpers/getProp";
import setProp from "../helpers/setProp";

Vue.use(Vuex);
const store = new Vuex.Store({});

@Module({ dynamic: true, namespaced: true, store: store, name: "Entity" })
export default class EntitiesModule extends VuexModule implements EntityState {
  public entities = {};
  public socket = null as typeof Socket | null;

  get getEntities() {
    return this.entities;
  }

  @Action
  refresh(type: Function) {
    if (
      getProp((<EntityState>this.context.state).entities, [
        type.name.toLocaleLowerCase() + "s",
      ]) === undefined
    ) {
      this.context.commit("emit", {
        event: "Entity/getAll",
        payload: type.name,
      });
    }
  }

  @Mutation
  async save(params: { type: Function; entity: any }) {
    console.log(`EntityModule.save: ${params.type.name}, ${params.entity}`);
    this.socket?.emit("Entity/save", params.type.name, params.entity);
  }

  //todo: rework socket injection
  @Mutation
  setup(params: { socket: SocketIOClient.Socket }) {
    this.socket = params.socket;
  }

  @Mutation
  store(params: { typeName: string; entities: [] }) {
    //console.log(`Entity/store: ${JSON.stringify(params)}`);
    setProp(this.entities, [params.typeName.toLowerCase()], params.entities);
  }

  @Mutation
  add(entity: any) {
    console.log(`Entity/add: ${entity}`);

    let set = getProp(this.entities, [
      entity.EntityType.toLowerCase() + "s"
    ]);

    if (set === undefined) {
      set = [];
    }

    set.push(entity as never);

    setProp(this.entities, [entity.EntityType.toLowerCase() + "s"], set);

  }

  @Mutation
  saved(entity: any) {
    console.log(`Entity saved: ${entity.EntityType} - ${entity}`);
  }

  @Mutation
  emit(params: { event: string; payload: any }) {
    console.log(`emit(${params.event}, ${JSON.stringify(params.payload)})`);
    this.socket?.emit(params.event, params.payload);
  }
}