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
    store.state.Entity.socket = socketServer.socketClient;

    // Important: setup the spy used in the post action asserts.
    emitSpy = jest.spyOn(store.state.Entity.socket, "emit");
  });

  it("Should emit message to socket on success", async () => {
    // 1. setup payload
    const payload = { type: { name: "Board" }, id: "Foo" };

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
    });

    // 3. Act on sut
    store
      .dispatch("Entity/refreshSet", payload)
      .then(() => {
        // 4. Assert any store values, mocks, spys, etc. after action
        expect(emitSpy).toHaveBeenCalledTimes(1);
      })
      .catch((e) => {
        // 5. Catch any errors and fail the test
        fail(e);
      });
  });

  //it("Should handle errors...")
});
