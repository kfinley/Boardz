import { Commit } from "vuex";

export function configureListeners(
  commit: Commit,
  socket: any,
  entityTypes: { name: string }[]
) {
  socket.on("Entity/saved", (data: any) => {
    
    //TODO: work this out...
    //commit("Entity/setEntities", { name: data.EntityType, set: undefined });
    commit("Entity/refreshSets", { type: { name: data.EntityType } });
    //commit("Entity/add", data);
    //commit("Entity/saved", data);
  });

  entityTypes.forEach((e) => {
    const type = `${e.name}s`;
    socket.on(
      `Entity/${type}`,
      (resp: { id: string; TotalRecords: number; Entities: [] }) => {
        console.log(
          `Socket <-- Entity/${type} : ${JSON.stringify(resp.Entities)}`
        );
        commit("Entity/store", {
          typeName: type,
          id: resp.id,
          entities: resp.Entities,
        });
      }
    );
  });
}
