import MockedSocket from "socket.io-mock";
import { storeFactory } from "./___helpers";

const commit = jest.fn();
let socketServer = new MockedSocket();
let emitSpy: any;

const store = storeFactory(commit);

describe("Entities Module: save", () => {
  beforeEach(async () => {
    // Reset mocks
    commit.mockReset();
    socketServer = new MockedSocket();
    store.state.Entity.socket = socketServer.socketClient;

    // Important: setup the spy used in the post action asserts.
    emitSpy = jest.spyOn(store.state.Entity.socket, "emit");
  });

  it("Should emit message to socket on success", async () => {
    // Arrange
    const testEntity = {
      Description: "Foo-tastic!",
      Name: "foo",
    };

    const payload = {
      id: "Foo",
      type: "Board",
      entity: testEntity,
    };

    let socketAsserts = false;

    // Mock
    socketServer.on(
      "Entity/save",
      (params: { id: string; type: string; entity: any }) => {
        // Assert
        expect(params.id).toEqual("Foo");
        expect(params.type).toEqual("Board");
        expect(params.entity).toMatchObject(testEntity);
        socketAsserts = true;
      }
    );

    // Act
    await store.dispatch("Entity/save", payload);

    // Assert
    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(emitSpy).lastCalledWith("Entity/save", {
      id: "Foo",
      type: "Board",
      entity: testEntity,
    });
    expect(socketAsserts).toBeTruthy();
  });

});
