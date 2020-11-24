import { storeFactory } from "./___helpers";

describe("Entities Module: removeSet", () => {
  it("Should remove the set from the store based on Id", () => {
    // Arrange

    const store = storeFactory();
    store.state.Entity.entities.boards = {
      Foo: {
        id: "Foo",
        result: [
          {
            Id: "123-123-123",
            Name: "Yea",
            Description: "Buddy",
          },
          {
            Id: "456-456-456",
            Name: "Yo",
            Description: "Buddy",
          },
        ],
      },
    };

    const payload = { type: { name: "Board" }, id: "Foo" };

    // Act
    store.dispatch("Entity/removeSet", payload);

    // Assert
    expect(store.state.Entity.entities.boards.Foo).toBeUndefined();
  });
});
