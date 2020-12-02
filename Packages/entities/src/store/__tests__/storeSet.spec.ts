import { storeFactory } from "./___helpers";

describe("Entities Module: store", () => {
  it("Should save EntitySet in store with id as key", () => {
    // Arrange

    const store = storeFactory();
    const payload = {
      type: "Board",
      id: "Key",
      entities: [
        {
          Id: "123-123-123",
          Name: "Yea",
          Description: "Buddy",
        },
        {
          Id: "456-456-456",
          Name: "Yea",
          Description: "Buddy",
        },
      ],
    };

    // Act
    store.commit("Entity/storeSet", payload);

    // Assert
    expect(store.state.Entity.entities.Key).toBeInstanceOf(Object);
    expect(store.state.Entity.entities.Key.result).toBeInstanceOf(Array);
    expect(store.state.Entity.entities.Key.result.length).toBe(2);
  });
});
