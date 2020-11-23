import SocketIOClient from "socket.io-client";

export default interface EntityState {
  socket?: SocketIOClient.Socket | null;
  entities: {};
}

export const EntityState: EntityState = {
  socket: null,
  entities: {
    // Move to this kind of a store layout to support multiple entity lists on one page.
    // boards: {
    //    123: {
    //       id: 123,
    //       result: [],
    //       filters: "",
    //       pageSize: 10,
    //       properties: "",
    //       pageNumber: 0,
    //    },
    //    234:  {
    //       id: 234,
    //       result: [],
    //       filters: "",
    //       pageSize: 10,
    //       properties: "",
    //       pageNumber: 0,
    //    },
    // },
    // cards: [],
  },
};
