import Factory from "./__factory";
import Components from "../index";
import { EntitySet } from "../../types";

describe("EntityList.vue using set", () => {
  const set = <EntitySet>(<unknown>{
    result: [
      {
        Id: 123,
        Name: "yeah buddy!",
      },
    ],
  });

  it("mounts", () => {
    const component = Factory.component(Components.EntityList, {
      set,
    });
    expect(component.vm).toBeInstanceOf(Object);
  });
  it("shows a title", () => {
    const component = Factory.component(Components.EntityList, {
      set,
      title: "Awesome Sauce!!",
    });

    expect(component.vm).toBeInstanceOf(Object);

    const title = component.find("div > h2");
    expect(title).toBeInstanceOf(Object);
    expect(title.text().trim()).toEqual("Awesome Sauce!!");
  });
  it("should not call refreshSet when mounted", () => {
    const mocks = {
      actions: { "Entity/refreshSet": jest.fn() },
      mutations: {},
      getters: {},
    };

    const component = Factory.component(
      Components.EntityList,
      {
        set,
      },
      mocks
    );

    expect(component.vm).toBeInstanceOf(Object);
    expect(mocks.actions["Entity/refreshSet"]).toHaveBeenCalledTimes(0);
  });
  it("should not call setFilters when created", () => {
    const mocks = {
      actions: {},
      mutations: { "Entity/setFilters": jest.fn(), },
      getters: {}
    };

    const component = Factory.component(
      Components.EntityList,
      {
        set,
      },
      mocks
    );

    expect(component.vm).toBeInstanceOf(Object);
    expect(mocks.mutations["Entity/setFilters"]).toHaveBeenCalledTimes(0);
  });
  it("should not call setProperties when created", () => {
    const mocks = {
      actions: {},
      mutations: { "Entity/setProperties": jest.fn(), },
      getters: {}
    };

    const component = Factory.component(
      Components.EntityList,
      {
        set,
      },
      mocks
    );

    expect(component.vm).toBeInstanceOf(Object);
    expect(mocks.mutations["Entity/setProperties"]).toHaveBeenCalledTimes(0);
  });
});
