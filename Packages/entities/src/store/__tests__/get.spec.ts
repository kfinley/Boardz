import { Socket } from "socket.io-client";
import MockedSocket from "socket.io-mock";
import { storeFactory } from "./___helpers";

const commit = jest.fn();
let socketServer = new MockedSocket();
let emitSpy: any;

const store = storeFactory(commit);

describe("Entities Module: get", () => {
  beforeEach(() => {
    // Reset mocks
    commit.mockReset();
    socketServer = new MockedSocket();

    // Reset State
    store.state.Entity.socket = socketServer.socketClient;
    store.state.Entity.entities = {};

    // Important: setup the spy used in the post action asserts.
    emitSpy = jest.spyOn(store.state.Entity.socket as Socket, "emit");
  });

  it("should ensure an EntitySet is present for the query", async () => {
    //Arrange
    const payload = { id: "test", name: "Board", filters: "Id:123" };

    // Act
    await store.dispatch("Entity/get", payload);

    // Assert
    expect(store.state.Entity.entities).toHaveProperty("test");
  });

  it("should handle queries with no properties or filters", async () => {
    //Arrange
    const payload = { id: "test", name: "Board" };

    // Act
    await store.dispatch("Entity/get", payload);

    // Assert
    expect(store.state.Entity.entities).toHaveProperty("test");
  });

  it("should use the type param value as the EntitySet key if no id is provided", async () => {
    //Arrange
    const payload = { type: "Board", filters: "Id:123" };

    // Act
    await store.dispatch("Entity/get", payload);

    // Assert
    expect(store.state.Entity.entities).toHaveProperty("Board");
  });

  it("should emit message to socket on success", async () => {
    // Arrange

    let socketAsserts = false;

    // Mock
    socketServer.on("Entity/getAll", function(message: any) {
      // Assert
      expect(message).toMatchObject({
        id: "Board",
        type: "Board",
        filters: '[["Id","123"]]',
      });
      socketAsserts = true;
    });

    const payload = { type: "Board", filters: "Id:123" };

    // Act
    await store.dispatch("Entity/get", payload);

    // Assert
    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(socketAsserts).toBeTruthy();
  });

  it("should commit setFilters if present", async () => {
    // Arrange
    const payload = { type: "Board", filters: "Id:123" };

    // Act
    await store.dispatch("Entity/get", payload);

    // Assert
    expect(commit).toHaveBeenCalledWith(
      "Entity/setFilters",
      { filters: '[["Id","123"]]', id: "Board" },
      undefined
    );
  });

  it("should commit setProperties if present", async () => {
    // Arrange
    const payload = { type: "Board", properties: "Name" };

    // Act
    await store.dispatch("Entity/get", payload);

    // Assert
    expect(commit).toHaveBeenCalledWith(
      "Entity/setProperties",
      { properties: "Name", id: "Board" },
      undefined
    );
  });
  
  
});
