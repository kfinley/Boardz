import * as http from "http";
import { authHelper, api } from "api";
import { Config } from "config";
import { authenticate, authorize, AuthResponse } from "auth";

//TODO: fix config for node server env

Config.Api = "http://boardz.app:8080/api/v1";
Config.Host = "boardz.app:8080";
Config.Agent = "bo-boardz-web/0.0.1";
Config.WebSocketPort = "8085";

//TODO: fix this...
api.BaseUrl = "http://boardz.app:8080/api/v1";
api.Auth = `${api.BaseUrl}/auth`;

export default class AuthModule {
  private server: http.Server;
  private io: SocketIO.Server;

  constructor(server: http.Server, io: SocketIO.Server) {
    this.server = server;
    this.io = io;
  }

  public listen(): void {
    this.io.on("connect", (socket: SocketIO.Socket) => {
      console.log("Auth: Client connected");

      socket.on("Auth/authenticate", ({ username, password }) => {
        const response = authenticate({ username, password })
          .then((response: AuthResponse) => {
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
            //TODO: API currently sends 500 for failed login. Need to fix....
            socket.emit("Auth/failed");
          });
      });

      socket.on("Auth/authorize", (token: string) => {
        (socket as any).token = token;
        console.log(`Auth/authorize`);
        authHelper.authToken = () => {
          return (socket as any).token;
        };
        const response = authorize(token)
          .then((response: AuthResponse) => {            
            // if (!response.Success) {
            //   socket.emit("Auth/failed");
            // }
          })
          .catch((e: any) => {
            console.log(e);
            // socket.emit("Auth/failed");
          });
      });

      socket.on("disconnect", () => {
        console.log("Auth: Client disconnected");
      });
    });
  }
}
