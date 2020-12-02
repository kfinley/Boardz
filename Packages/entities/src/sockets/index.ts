import { Commit } from "vuex";

export function configureListeners(
  commit: Commit,
  socket: any,
  entityTypes: { name: string }[]
) {
  entityTypes.forEach((e) => {
    const type = `${e.name}s`;
    socket.on(
      `Entity/${type}`,
      (resp: { id: string; TotalRecords: number; Entities: [] }) => {
        console.log(
          `Socket <-- Entity/${type} : ${resp.id} - ${JSON.stringify(
            resp.Entities
          )}`
        );
        commit("Entity/storeSet", {
          type: e.name,
          id: resp.id,
          entities: resp.Entities,
        });
      }
    );
  });

  socket.on("Entity/saved", (id: string, data: any) => {
  //socket.emit("Entity/saved", { id, data: response.data });
  
    //commit("Entity/add", { id, entity: data });
    
  });
}
