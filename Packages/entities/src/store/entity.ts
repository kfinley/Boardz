import SocketIOClient from "socket.io-client";
import Vue from "vue";
import Vuex from "vuex";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import EntityState from "../state/entity";
import getProp from "../helpers/getProp";
import setProp from "../helpers/setProp";
import { EntitySet } from "../types";

Vue.use(Vuex);
const store = new Vuex.Store({});

@Module({ dynamic: true, namespaced: true, store: store, name: "Entity" })
export default class EntitiesModule extends VuexModule implements EntityState {
  public entities = {};
  public socket = null as SocketIOClient.Socket | null;

  get getEntities() {
    return this.entities;
  }

  @Action
  refresh(type: { name: string }) {
    this.context.commit("refreshEntities", type);
  }

  @Mutation
  async refreshEntities(type: { name: string }) {
    let set = getProp(this.entities, [
      type.name.toLocaleLowerCase() + "s",
    ]) as EntitySet;
    if (set == undefined || set.current == undefined) {
      if (set === undefined) {
        set = {
          pageNumber: 0,
          pageSize: 10,
          filters: "",
          properties: [],
          current: [],
          all: [],
        };
        setProp(this.entities, [type.name.toLocaleLowerCase() + "s"], set);
      }

      this.socket?.emit("Entity/getAll", {
        type: type.name,
        pageNumber: set.pageNumber,
        pageSize: set.pageSize,
        sortBy: set.sortBy,
        sortDirection: set.sortDirection,
        filters: set.sortDirection,
        properties: set.properties,
      });
    }
  }

  @Mutation setEntities(params: { name: string; set: [] }) {
    setProp(
      this.entities,
      [params.name.toLocaleLowerCase() + "s", "current"],
      params.set
    );
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

    setProp(
      this.entities,
      [params.typeName.toLocaleLowerCase(), "current"],
      params.entities
    );
    //setProp(this.entities, [params.typeName.toLowerCase()], params.entities);
  }

  @Mutation
  add(entity: any) {
    console.log(`Entity/add: ${entity}`);

    const set = getProp(this.entities, [
      entity.EntityType.toLowerCase() + "s",
    ]) as EntitySet;

    set.all.push(entity as never);

    setProp(
      this.entities,
      [entity.EntityType.toLowerCase() + "s", "all"],
      set.all
    );
    this.context.dispatch("refresh", entity.EntityType);
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
