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
    const payload = {
      type: { name: "Board" },
      entity: {
        Name: "foo",
        Description: "Foo-tastic!",
      },
    };

    let socketAsserts = false;

    // Mock
    socketServer.on("Entity/save", (name: any, entity: any) => {
      // Assert
      expect(name).toEqual("Board");
      expect(entity).toMatchObject({
        Name: "foo",
        Description: "Foo-tastic!",
      });
      socketAsserts = true;
    });

    // Act
    store
      .dispatch("Entity/save", payload)
      .then(() => {
        // Assert
        expect(emitSpy).toHaveBeenCalledTimes(1);
        expect(emitSpy).lastCalledWith("Entity/save", "Board", {
          Description: "Foo-tastic!",
          Name: "foo",
        });
        expect(socketAsserts).toBeTruthy();
      })
      .catch((e) => {
        // Fail
        fail(e);
      });
  });

  //it("Should handle errors...")
});
