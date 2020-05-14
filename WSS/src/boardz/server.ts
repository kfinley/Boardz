import * as http from "http";
import { getList, authHelper, api } from "api";
import { Board } from "boardz";
import { Config } from "config";

//TODO: fix config for node server env
Config.Host = "boardz.app:8080";
api.BaseUrl = "http://boardz.app:8080/api/v1";
Config.Agent = "bo-boardz-web/0.0.1";
Config.Api = "boardz.app:8080/api/v1";
Config.WebSocketPort = "8085";

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

      socket.on("authenticate", (token: string) => {
        authHelper.authToken = () => {
          return token;
        };
      });

      socket.on("get-boards", () => {
        console.log(`${socket.id}: get-boards`);

        const response = getList<Board>(Board)
          .then((response) => {
            console.log(response.data);
            socket.emit("boards", response.data.Entities);
          })
          .catch((e) => {
            console.log(e);
          })
          .finally();
      });

      // socket.on("message", (m: any) => {
      //   console.log("[server](message): %s", JSON.stringify(m));
      //   this.io.emit("message", m);
      // });

      socket.on("disconnect", () => {
        console.log("Boardz: Client disconnected");
      });
    });
  }
}
