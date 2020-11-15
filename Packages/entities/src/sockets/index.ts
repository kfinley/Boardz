import { Commit, Dispatch } from "vuex";

export function configureListeners(commit: Commit, socket: any) {
  socket.on("Entity/saved", (data: any) => {
    console.log(data);
    commit("Entity/setEntities", { name: data.EntityType, set: undefined });
    commit("Entity/refreshEntities", { name: data.EntityType });
    //commit("Entity/add", data);
    //commit("Entity/saved", data);
  });

  socket.on("Entity/Boards", (data: { TotalRecords: number; Entities: [] }) => {
    console.log(`Socket <-- Entity/Boards : ${JSON.stringify(data.Entities)}`);
    commit("Entity/store", { typeName: "Boards", entities: data.Entities });
  });
}
