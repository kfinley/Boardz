import { storeFactory } from "./___helpers";

describe("Entities Module: setFilters", () => {
  it("Should set filters on the correct EntitySet", () => {
    // Arrange
    const filters = "Flam.Id:Foo";

    const store = storeFactory();
    const payload = { name: "Board", id: "Foo", filters };

    // Act
    store.commit("Entity/setFilters", payload);

    // Assert
    expect(store.state.Entity.entities.boards.Foo).toBeInstanceOf(Object);
    expect(store.state.Entity.entities.boards.Foo.filters).toEqual(filters);

  });

});
