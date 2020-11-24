import MockedSocket from "socket.io-mock";
import { storeFactory } from "./___helpers";

const commit = jest.fn();
let socketServer = new MockedSocket();
let emitSpy: any;

const store = storeFactory(commit);

describe("Entities Module: refreshSet", () => {
  beforeEach(async () => {
    // Reset mocks
    commit.mockReset();
    socketServer = new MockedSocket();
    
    // Reset State
    store.state.Entity.socket = socketServer.socketClient;
    store.state.Entity.entities = {}

    // Important: setup the spy used in the post action asserts.
    emitSpy = jest.spyOn(store.state.Entity.socket, "emit");
  });

  it("Should emit message to socket on success", async () => {
    // 1. setup payload
    const payload = { type: { name: "Board" }, id: "Foo" };

    let socketAsserts = false;

    // 2. Setup mocked socket server listeners to and asserts
    socketServer.on("Entity/getAll", function(message: any) {
      expect(message).toMatchObject({
        filters: "",
        id: "Foo",
        pageNumber: 0,
        pageSize: 10,
        properties: [],
        type: "Board",
      });
      socketAsserts = true;
    });

    // 3. Act on sut
    store
      .dispatch("Entity/refreshSet", payload)
      .then(() => {
        // 4. Assert any store values, mocks, spys, etc. after action
        expect(emitSpy).toHaveBeenCalledTimes(1);
        expect(socketAsserts).toBeTruthy();
      })
      .catch((e) => {
        // 5. Catch any errors and fail the test
        fail(e);
      });
  });

  it("Should convert filters to stringified array", async () => {

    // Arrange
    const payload = { type: { name: "Board" }, id: "Foo" };    
    store.state.Entity.entities = {
      boards: {
        Foo: {
          filters: "Page.Id:123",
        },
      },
    };

    let socketAsserts = false;

    // Arrange
    socketServer.on("Entity/getAll", function(message: any) {
      // Assert
      expect(message).toMatchObject({
        filters: "[[\"Page.Id\",\"123\"]]",
        id: "Foo",
        type: "Board",
      });
      socketAsserts = true;
    });

    // Act
    store
      .dispatch("Entity/refreshSet", payload)
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
  //it("Should handle errors...")
});
