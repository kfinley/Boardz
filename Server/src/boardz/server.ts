import * as http from "http";
import { GetAllEntitiesRequest, authHelper, api, save, getEntities } from "api";
import { Config } from "config";
import { authenticate } from "auth";

//TODO: fix config for node server env

Config.Api = "http://boardz.app:8080/api/v1";
Config.Host = "boardz.app:8080";
Config.Agent = "bo-boardz-web/0.0.1";
Config.WebSocketPort = "8085";

api.BaseUrl = "http://boardz.app:8080/api/v1";
api.Boards = `${api.BaseUrl}/boards`;
api.Login = `${api.BaseUrl}/auth`;

export default class BoardzServer {
  private server: http.Server;
  private io: SocketIO.Server;

  constructor(server: http.Server, io: SocketIO.Server) {
    this.server = server;
    this.io = io;
  }

  public listen(): void {
    this.io.on("connect", (socket: SocketIO.Socket) => {
      console.log("Boardz: Client connected");

      socket.on("Auth/authenticate", ({ username, password }) => {
        const response = authenticate({ username, password })
          .then((response) => {
            if (response.AccessToken) {
              (socket as any).token = response.AccessToken;

              socket.emit("Auth/success", response);

              authHelper.authToken = () => {
                return (socket as any).token;
              };

            } else {
              socket.emit("Auth/failed");
            }
          })
          .catch((e) => {
            // API currently sends 500 for failed login. Need to fix....
            socket.emit("Auth/failed");
          });
      });

      socket.on("Auth/authorize", (token: string) => {
        (socket as any).token = token;
        console.log("authorize");
        authHelper.authToken = () => {
          return (socket as any).token;
        };
      });

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
        const response = getEntities(req)
          .then((get) => {
            console.log(`Entity/${req.type}s, ${JSON.stringify(get.data)}`);
            socket.emit(`Entity/${req.type}s`, get.data);
          })
          .catch((e) => {
            console.log(e);
          });
      });

      socket.on("disconnect", () => {
        console.log("Boardz: Client disconnected");
      });
    });
  }
}
