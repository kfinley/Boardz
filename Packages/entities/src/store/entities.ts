import SocketIOClient from "socket.io-client";
import Vue from "vue";
import Vuex from "vuex";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import EntityState from "../state/entity";
import { getProp, setProp } from "../helpers";
import { EntitySet } from "../types";

Vue.use(Vuex);
const store = new Vuex.Store<EntityState>({});

@Module({ dynamic: true, namespaced: true, name: "Entity", store })
export default class extends VuexModule implements EntityState {
  public entities = {};
  public socket = null as SocketIOClient.Socket | null;

  get getEntities() {
    return this.entities;
  }

  get getSocket() {
    return this.socket;
  }

  @Action
  get(params: {
    id?: string;
    type: string;
    filters?: string;
    properties?: string;
  }) {
    params.id = params.id ?? params.type;
    const state = this.context.state as EntityState;

    let set = getProp(state.entities, [params.id, "result"]) as [];

    if (set === undefined) {
      set = [];
    }

    setProp(state.entities, [params.id, "result"], set);

    params.filters =
      params.filters !== undefined && params.filters?.indexOf(":") > 0
        ? JSON.stringify([
            [params.filters?.split(":")[0], params.filters?.split(":")[1]],
          ])
        : undefined;

    if (params.filters !== undefined) {
      this.context.commit("setFilters", {
        id: params.id,
        type: params.type,
        filters: params.filters,
      });
    }

    if (params.properties !== undefined) {
      this.context.commit("setProperties", {
        id: params.id,
        type: params.type,
        properties: params.properties,
      });
    }

    state.socket?.emit("Entity/getAll", {
      id: params.id,
      type: params.type,
      filters: params.filters,
      properties: params.properties,
    });
  }

  @Action
  save(params: { id?: string; type: string; entity: any }) {
    // console.log(
    //   `EntityModule.save: ${params.type.name}, ${JSON.stringify(params.entity)}`
    // );
    params.id = params.id ?? params.type;

    this.context.getters["getSocket"]?.emit("Entity/save", {
      id: params.id,
      type: params.type,
      entity: params.entity,
    });
  }

  @Action
  removeSet(params: { id: string }) {
    delete this.context.getters["getEntities"][params.id];
  }

  @Mutation
  setFilters(params: { id: string; type: string; filters: string }) {
    if (params.filters !== undefined) {
      let set = getProp(this.entities, [params.id]) as EntitySet;

      if (set == undefined) {
        set = {
          type: params.type,
          pageNumber: 0,
          pageSize: 10,
          filters: "",
          properties: "",
          result: [],
        };
      }

      if (set.filters !== params.filters) {
        set.filters = params.filters;
        set.type = params.type;
        set.result = [];
        //TODO: move to mutation
        setProp(this.entities, [params.id], set);
      }
    }
  }

  @Mutation
  setProperties(params: { id: string; type: string; properties: string }) {
    if (params.properties !== undefined) {
      let set = getProp(this.entities, [params.id]) as EntitySet;

      if (set === undefined) {
        set = {
          type: params.type,
          pageNumber: 0,
          pageSize: 10,
          filters: "",
          properties: "",
          result: [],
        };
      }

      if (set.properties !== params.properties) {
        set.properties = params.properties;
        set.type = params.type;
        set.result = [];
        //TODO: move to mutation
        setProp(this.entities, [params.id], set);
      }
    }
  }

  //todo: rework socket injection
  @Mutation
  setup(params: { socket: SocketIOClient.Socket }) {
    this.socket = params.socket;
  }

  @Mutation
  storeSet(params: { type: string; id: string; entities: [] }) {
    params.id = params.id ?? params.type;
    setProp(this.entities, [params.id, "result"], params.entities);
  }

  @Mutation
  saved(params: { id: string; entity: any }) {
    // console.log(
    //   `Entity saved: id: ${params.id} entity:${JSON.stringify(params.entity)}`
    // );

    const set = (this.entities as any)[params.id] as EntitySet;

    this.socket?.emit("Entity/getAll", {
      id: params.id,
      type: set.type,
      filters: set.filters,
      properties: set.properties,
    });
  }

  @Mutation
  emit(params: { event: string; payload: any }) {
    console.log(`emit(${params.event}, ${JSON.stringify(params.payload)})`);
    this.socket?.emit(params.event, params.payload);
  }
}
