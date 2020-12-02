import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import EntitiesModule from "../store/entities";

let entitiesModule: EntitiesModule;

function initializeStores(store: Store<any>): void {
  entitiesModule = getModule(EntitiesModule, store);
}

export { initializeStores, entitiesModule };
