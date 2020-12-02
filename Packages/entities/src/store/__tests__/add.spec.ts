import { storeFactory } from "./___helpers";

describe("Entities Module: add", () => {
  it("should add an entity to an existing EntitySet", () => {
    // Arrange

    const store = storeFactory();
    store.replaceState({
      Entity: {
        entities: {
          Foo: {
            result: [],
          },
        },
      },
    });

    const payload = {
      type: "Board",
      id: "Foo",
      entity: { Name: "Foo", Description: "Yeah buddy!!" },
    };

    // Act
    store.commit("Entity/add", payload);

    // Assert
    expect(store.state.Entity.entities.Foo).toBeInstanceOf(Object);
    expect(store.state.Entity.entities.Foo.result).toContain(payload.entity);
  });
});
