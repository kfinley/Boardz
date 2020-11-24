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

@Module({ dynamic: true, namespaced: true, name: "Entity", store })
export default class EntitiesModule extends VuexModule implements EntityState {
  public entities = {};
  public socket = null as SocketIOClient.Socket | null;

  get getEntities() {
    return this.entities;
  }

  get getSocket() {
    return this.socket;
  }

  @Action get(params: { name: string; filters: string; properties?: string }) {
    //TODO: this is dumb... make it smarter

    const typeNameKey = `${params.name.toLowerCase()}s`;

    let set = getProp(this.context.getters["getEntities"], [
      typeNameKey,
      "set",
    ]) as [];

    if (set === undefined) {
      set = [];
    }

    //TODO: move to mutation
    setProp(this.context.getters["getEntities"], [typeNameKey, "set"], set);

    const filters =
      params.filters.indexOf(":") > 0
        ? JSON.stringify([
            [params.filters.split(":")[0], params.filters.split(":")[1]],
          ])
        : "";

    this.context.getters["getSocket"]?.emit("Entity/getAll", {
      type: params.name,
      filters: filters,
      properties: params.properties,
    });
  }

  @Mutation
  refreshSets(params: { type: Function }) {
    const typeNameKey = `${params.type.name.toLowerCase()}s`;
    const sets = getProp(this.entities, [typeNameKey]);

    for (const id in sets) {
      // each set is keyed by it's id
      if (id !== "set") {
        this.socket?.emit("Entity/getAll", {
          id,
          type: params.type.name,
          pageNumber: sets[id].pageNumber,
          pageSize: sets[id].pageSize,
          sortBy: sets[id].sortBy,
          sortDirection: sets[id].sortDirection,
          filters: sets[id].filters?.indexOf(":") > 0
          ? JSON.stringify([
              [sets[id].filters.split(":")[0], sets[id].filters.split(":")[1]],
            ])
          : "",
          properties: sets[id].properties,
        });
      }
    }
  }

  @Action
  async refreshSet(params: { type: Function; id: string }) {
    const typeNameKey = `${params.type.name.toLowerCase()}s`;

    let set = getProp(this.context.getters["getEntities"], [
      typeNameKey,
      params.id,
    ]) as EntitySet;

    if (set === undefined) {
      set = {
        id: params.id,
        pageNumber: 0,
        pageSize: 10,
        filters: "",
        properties: [],
        result: [],
      };
    }

    //TODO: move to mutation
    setProp(this.context.getters["getEntities"], [typeNameKey, params.id], set);

    set.filters =
      set.filters.indexOf(":") > 0
        ? JSON.stringify([
            [set.filters.split(":")[0], set.filters.split(":")[1]],
          ])
        : "";

    this.context.getters["getSocket"]?.emit("Entity/getAll", {
      type: params.type.name,
      id: params.id,
      pageNumber: set.pageNumber,
      pageSize: set.pageSize,
      sortBy: set.sortBy,
      sortDirection: set.sortDirection,
      filters: set.filters,
      properties: set.properties,
    });
  }

  @Action
  save(params: { type: Function; entity: any }) {
    // console.log(
    //   `EntityModule.save: ${params.type.name}, ${JSON.stringify(params.entity)}`
    // );
    this.context.getters["getSocket"]?.emit(
      "Entity/save",
      params.type.name,
      params.entity
    );
  }

  @Mutation
  setEntities(params: { name: string; id: string; set: [] }) {
    setProp(
      this.entities,
      [`${params.name.toLowerCase()}s`, params.id, "result"],
      params.set
    );
  }

  @Mutation
  setFilters(params: { name: string; id: string; filters: string }) {
    if (params.filters !== undefined) {
      const typeNameKey = `${params.name.toLowerCase()}s`;

      let set = getProp(this.entities, [typeNameKey, params.id]) as EntitySet;

      if (set == undefined) {
        set = {
          id: params.id,
          pageNumber: 0,
          pageSize: 10,
          filters: "",
          properties: [],
          result: [],
        };
      }

      if (set.filters !== params.filters) {
        set.filters = params.filters;
        set.result = [];
        //TODO: move to mutation
        setProp(this.entities, [typeNameKey, params.id], set);
      }
    }
  }

  @Action
  removeSet(params: { type: Function; id: string }) {
    const typeNameKey = `${params.type.name.toLowerCase()}s`;

    //TODO: move to mutation
    delete this.context.getters["getEntities"][typeNameKey][params.id];
  }

  //todo: rework socket injection
  @Mutation
  setup(params: { socket: SocketIOClient.Socket }) {
    this.socket = params.socket;
  }

  @Mutation
  store(params: { typeName: string; id: string; entities: [] }) {
    if (params.id !== undefined) {
      setProp(
        this.entities,
        [params.typeName.toLowerCase(), params.id, "result"],
        params.entities
      );
    } else {
      setProp(
        this.entities,
        [params.typeName.toLowerCase(), "set"],
        params.entities
      );
    }
  }

  @Mutation
  add(entity: any) {
    console.log(`Entity/add: ${entity}`);

    const set = getProp(this.entities, [entity.EntityType.toLowerCase() + "s"]);

    set.all.push(entity as never);

    setProp(
      this.entities,
      [`${entity.EntityType.toLowerCase()}s`, "all"],
      set.all
    );
    throw "Fix this!";
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
