import express from "express";
import cors from "cors";
import * as http from "http";
import ChatModule from "./chat";
import EntitiesModule from "./entities";
import AuthModule from './auth';

export class SocketServer {
  public static readonly PORT: number = 8085;
  private app: express.Application;
  private server: http.Server;
  private io: SocketIO.Server;
  private port: string | number;

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
    this.app.use(cors());
  }

  private createServer(): void {
    this.server = http.createServer(this.app);
  }

  private config(): void {
    this.port = process.env.PORT || SocketServer.PORT;
  }

  private sockets(): void {
    this.io = require("socket.io")(this.server, {
      cors: {
        //TODO: Config this....
        origin: [
          "http://localhost:8081",
          "http://boardz.app:8080",
          "https://boardz.app",
        ],
      },
    });
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log("Running server on port %s", this.port);
    });

    // const chat = new ChatModule(this.server, this.io);
    // chat.listen();

    const auth = new AuthModule(this.server, this.io);
    auth.listen();
        
    const entities = new EntitiesModule(this.server, this.io);
    entities.listen();

  }

  public getApp(): express.Application {
    return this.app;
  }
}
