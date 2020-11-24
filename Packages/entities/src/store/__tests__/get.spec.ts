import MockedSocket from "socket.io-mock";
import { storeFactory } from "./___helpers";

const commit = jest.fn();
let socketServer = new MockedSocket();
let emitSpy: any;

const store = storeFactory(commit);

describe("Entities Module: get", () => {
  beforeEach(async () => {
    // Reset mocks
    commit.mockReset();
    socketServer = new MockedSocket();

    // Reset State
    store.state.Entity.socket = socketServer.socketClient;
    store.state.Entity.entities = {};

    // Important: setup the spy used in the post action asserts.
    emitSpy = jest.spyOn(store.state.Entity.socket, "emit");
  });

  it("Should emit message to socket on success", async () => {
    // Arrange

    let socketAsserts = false;

    // Mock
    socketServer.on("Entity/getAll", function(message: any) {
      // Assert
      expect(message).toMatchObject({
        filters: "[[\"Id\",\"123\"]]",
        type: "Board",
      });
      socketAsserts = true;
    });

    const payload = { name: "Board", filters: "Id:123"};

    // Act
    store
      .dispatch("Entity/get", payload)
      .then(() => {
        // Assert
        expect(emitSpy).toHaveBeenCalledTimes(1);
        expect(socketAsserts).toBeTruthy();
      })
      .catch((e) => {
        // Fail
        fail(e);
      });
  });

  //TODO handle no filter sent
});
