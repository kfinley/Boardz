export default interface EntityState {
    socket?: SocketIOClient.Socket | null,
    entities: {}
};

export const EntityState: EntityState = {
    socket: null,
    entities: {}
  };