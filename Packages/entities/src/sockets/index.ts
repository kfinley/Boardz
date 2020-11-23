import { Commit, Dispatch } from "vuex";

export function configureListeners(
  commit: Commit,
  socket: any,
  entityTypes: { name: string }[]
) {
  socket.on("Entity/saved", (data: any) => {
    console.log(data);
    commit("Entity/setEntities", { name: data.EntityType, set: undefined });
    commit("Entity/refreshEntities", { name: data.EntityType });
    //commit("Entity/add", data);
    //commit("Entity/saved", data);
  });

  entityTypes.forEach((e) => {
    const type = `${e.name}s`;
    socket.on(
      `Entity/${type}`,
      (data: { TotalRecords: number; Entities: [] }) => {
        console.log(
          `Socket <-- Entity/${type} : ${JSON.stringify(data.Entities)}`
        );
        commit("Entity/store", { typeName: type, entities: data.Entities });
      }
    );
  });
  // socket.on("Entity/Boards", (data: { TotalRecords: number; Entities: [] }) => {
  //   console.log(`Socket <-- Entity/Boards : ${JSON.stringify(data.Entities)}`);
  //   commit("Entity/store", { typeName: "Boards", entities: data.Entities });
  // });

  // socket.on("Entity/Stages", (data: { TotalRecords: number; Entities: [] }) => {
  //   console.log(`Socket <-- Entity/Stages : ${JSON.stringify(data.Entities)}`);
  //   commit("Entity/store", { typeName: "Stages", entities: data.Entities });
  // });
}
