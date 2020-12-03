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

  socket.on("Entity/saved", (resp: { id: string, data: any} ) => {
    console.log(`Socket <-- Entity/saved : id: ${resp.id} entity: ${resp.data}`);

    commit("Entity/saved", { id: resp.id, entity: resp.data });
  });
}
