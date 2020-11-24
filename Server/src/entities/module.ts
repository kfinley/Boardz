import * as http from "http";
import { GetAllEntitiesRequest, api, save, getEntities } from "api";
import { Config } from "config";

//TODO: fix config for node server env

Config.Api = "http://boardz.app:8080/api/v1";
Config.Host = "boardz.app:8080";
Config.Agent = "bo-boardz-web/0.0.1";
Config.WebSocketPort = "8085";

//TODO: fix this...
api.BaseUrl = "http://boardz.app:8080/api/v1";
api.Boards = `${api.BaseUrl}/boards`;
api.Auth = `${api.BaseUrl}/auth`;

export default class EntitiesModule {
  private server: http.Server;
  private io: SocketIO.Server;

  constructor(server: http.Server, io: SocketIO.Server) {
    this.server = server;
    this.io = io;
  }

  public listen(): void {
    this.io.on("connect", (socket: SocketIO.Socket) => {
      console.log("Entity: Client connected");

      socket.on("Entity/save", (name, entity) => {
        console.log(`${socket.id}: Entity/save`);
        console.log(name);
        console.log(entity);
        const response = save(name, entity)
          .then((response: { data: any }) => {
            console.log(response.data);
            socket.emit("Entity/saved", response.data);
          })
          .catch((e: any) => {
            console.log(e);
          });
      });

      socket.on("Entity/getAll", (req: GetAllEntitiesRequest) => {
        //console.log(req);
        getEntities(req)
          .then((resp: any) => {
            console.log(
              `Entity/${req.type}s, ${JSON.stringify({
                id: req.id,
                ...(resp.data as object),
              })}`
            );
            socket.emit(`Entity/${req.type}s`, {
              id: req.id,
              ...(resp.data as object),
            });
          })
          .catch(() => {
            console.log('Entity/getAll - Error');
            //console.log(e);
          });
      });

      socket.on("disconnect", () => {
        console.log("Entity: Client disconnected");
      });
    });
  }
}
