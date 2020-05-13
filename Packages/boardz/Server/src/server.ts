import * as http from "http";
import { getList } from "api/dist";
import { Board } from "boardz";

export default class BoardzServer {
  private server: http.Server;
  private io: SocketIO.Server;

  constructor(server: http.Server, io: SocketIO.Server) {
    this.server = server;
    this.io = io;
  }

  public listen(): void {
    this.io.on("connect", (socket: SocketIO.Socket) => {
      console.log("Client connected");

      socket.on("get-boards", () => {
        console.log(`${socket.id}: get-boards`);
        console.log('fuck');
        const response = getList<Board>(Board).then((response) => {
          console.log(response.data)
          socket.emit('boards', response.data.Entities);
        });
        
      });

      // socket.on("message", (m: any) => {
      //   console.log("[server](message): %s", JSON.stringify(m));
      //   this.io.emit("message", m);
      // });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }
}
