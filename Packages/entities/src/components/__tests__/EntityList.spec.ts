import componentFactory from "./__factory";
import Components from "../index";

describe("EntityList.vue", () => {
  it("mounts", () => {
    const component = componentFactory(Components.EntityList, {
      type: "Board",
    });
    expect(component.vm).toBeInstanceOf(Object);
  });
  it("shows a title", () => {
    const component = componentFactory(Components.EntityList, {
      type: "Board",
      title: "Awesome Sauce!!",
    });

    expect(component.vm).toBeInstanceOf(Object);

    const title = component.find("div > h2");
    expect(title).toBeInstanceOf(Object);
    expect(title.text().trim()).toEqual("Awesome Sauce!!");
  });
  it("calls refreshSet when mounted", () => {
    const mocks = {
      "Entity/refreshSet": jest.fn(),
    };

    const component = componentFactory(
      Components.EntityList,
      {
        type: "Board",
      },
      mocks
    );

    expect(component.vm).toBeInstanceOf(Object);
    expect(mocks["Entity/refreshSet"].mock.calls).toHaveLength(1);
    expect(mocks["Entity/refreshSet"]).toHaveBeenCalledTimes(1);
  });
  it("calls setFilters when created", () => {
    const mocks = {
      "Entity/setFilters": jest.fn(),
    };

    const component = componentFactory(
      Components.EntityList,
      {
        type: "Stage",
        filters: "Board.Id:123",
      },
      mocks
    );

    expect(component.vm).toBeInstanceOf(Object);
    expect(mocks["Entity/setFilters"].mock.calls).toHaveLength(1);
    expect(mocks["Entity/setFilters"]).toHaveBeenCalledTimes(1);
  });
  it("calls setProperties when created", () => {
    const mocks = {
      "Entity/setProperties": jest.fn(),
    };

    const component = componentFactory(
      Components.EntityList,
      {
        type: "Board",
        properties: "Name,Age",
      },
      mocks
    );

    expect(component.vm).toBeInstanceOf(Object);
    expect(mocks["Entity/setProperties"].mock.calls).toHaveLength(1);
    expect(mocks["Entity/setProperties"]).toHaveBeenCalledTimes(1);
  });
});
