import { storeFactory } from "./___helpers";

describe("Entities Module: setFilters", () => {
  it("Should set filters on the correct EntitySet", () => {
    // Arrange
    const properties = "Flim,Flam,Foo";

    const store = storeFactory();
    const payload = { id: "Fluss", properties };

    // Act
    store.commit("Entity/setProperties", payload);

    // Assert
    expect(store.state.Entity.entities.Fluss).toBeInstanceOf(Object);
    expect(store.state.Entity.entities.Fluss.properties).toEqual(properties);

  });

});
