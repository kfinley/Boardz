import { storeFactory } from "./___helpers";

describe("Entities Module: store", () => {
  it("Should save EntitySet in store", () => {
    // Arrange

    const store = storeFactory();
    const payload = {
      typeName: "Boards",
      id: "_98a7_987",
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

    store.commit("Entity/store", payload);

    // Assert
    expect(store.state.Entity.entities.boards._98a7_987).toBeInstanceOf(Object);
    expect(store.state.Entity.entities.boards._98a7_987.result).toBeInstanceOf(
      Array
    );
    expect(store.state.Entity.entities.boards._98a7_987.result.length).toBe(
        2
      );
  });
});
