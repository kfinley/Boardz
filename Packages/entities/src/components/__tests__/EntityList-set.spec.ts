import componentFactory from "./__factory";
import Components from "../index";
import { EntitySet } from "~/types";

describe("EntityList.vue using set", () => {
  const set = <EntitySet><unknown>{
    result: [
      {
        Id: 123,
        Name: "yeah buddy!"
      },
    ],
  };

  it("mounts", () => {
    const component = componentFactory(Components.EntityList, {
      set
    });
    expect(component.vm).toBeInstanceOf(Object);
  });
  it("shows a title", () => {
    const component = componentFactory(Components.EntityList, {
      set,
      title: "Awesome Sauce!!",
    });

    expect(component.vm).toBeInstanceOf(Object);

    const title = component.find("div > h2");
    expect(title).toBeInstanceOf(Object);
    expect(title.text().trim()).toEqual("Awesome Sauce!!");
  });
  it("does not call refreshSet when mounted", () => {
    const mocks = {
      "Entity/refreshSet": jest.fn(),
    };

    const component = componentFactory(
      Components.EntityList,
      {
        set
      },
      mocks
    );

    expect(component.vm).toBeInstanceOf(Object);
    expect(mocks["Entity/refreshSet"]).toHaveBeenCalledTimes(0);
  });
  it("dost not call setFilters when created", () => {
    const mocks = {
      "Entity/setFilters": jest.fn(),
    };

    const component = componentFactory(
      Components.EntityList,
      {
        set
      },
      mocks
    );

    expect(component.vm).toBeInstanceOf(Object);
    expect(mocks["Entity/setFilters"]).toHaveBeenCalledTimes(0);
  });
  it("does not call setProperties when created", () => {
    const mocks = {
      "Entity/setProperties": jest.fn(),
    };

    const component = componentFactory(
      Components.EntityList,
      {
        set
      },
      mocks
    );

    expect(component.vm).toBeInstanceOf(Object);
    expect(mocks["Entity/setProperties"]).toHaveBeenCalledTimes(0);
  });
});
