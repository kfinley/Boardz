import * as http from "http";
import { authHelper, api } from "api";
import { Config } from "config";
import { authenticate, authorize, refresh, AuthResponse } from "auth";

//TODO: fix config for node server env

Config.Api = "http://boardz.app:8080/api/v1";
Config.Host = "boardz.app:8080";
Config.Agent = "bo-boardz-web/0.0.1";
Config.WebSocketPort = "8085";

//TODO: fix this...
api.BaseUrl = "http://boardz.app:8080/api/v1";
api.Auth = `${api.BaseUrl}/auth`;
api.Refresh = `${api.BaseUrl}/auth/refresh`;

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
              (socket as any).refreshToken = response.RefreshToken;

              socket.emit("Auth/success", response);

              authHelper.authToken = () => {
                return (socket as any).token;
              };
              authHelper.refreshToken = () => {
                return (socket as any).refreshToken;
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
        const response = authorize()
          .then((response: AuthResponse) => {            
            if (!response) {
              socket.emit("Auth/failed");
            }
          })
          .catch((e: any) => {
            if (e === "Refresh") {
              socket.emit("Auth/refresh");
            } else {
              socket.emit("Auth/failed");
            }
          });
      });

      socket.on("Auth/refresh", ({ username, refreshToken }) => {
        (socket as any).username = username;
        (socket as any).refreshToken = refreshToken;
        (socket as any).token = undefined;

        console.log(`Auth/refresh`);

        authHelper.username = () => {
          return (socket as any).username;
        };
        authHelper.authToken = () => {
          return (socket as any).token;
        };
        authHelper.refreshToken = () => {
          return `${(socket as any).username} ${(socket as any).refreshToken}`;
        };

        const response = refresh()
          .then((response: AuthResponse) => {
            console.log(`respnose: ${JSON.stringify(response)}`);

            (socket as any).token = response.AccessToken;
            (socket as any).refreshToken = response.RefreshToken;

            socket.emit("Auth/success", response);

            authHelper.authToken = () => {
              return (socket as any).token;
            };
            authHelper.refreshToken = () => {
              return (socket as any).refreshToken;
            };
          })
          .catch((e) => {
            console.log(`Error in Auth/refresh: ${JSON.stringify(e)}`);
            //TODO: API currently sends 500 for failed login. Need to fix....
            socket.emit("Auth/failed");
          });
      });

      socket.on("disconnect", () => {
        console.log("Auth: Client disconnected");
      });
    });
  }
}
