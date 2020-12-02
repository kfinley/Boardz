import Factory from "./__factory";
import Components from "../index";

describe("EntityList.vue using type", () => {
  const storeMocks = {
    actions: { "Entity/get": jest.fn() },
    mutations: {},
    getters: {},
  };
  const state = {
    Entity: {
      entities: {},
    },
  };
  beforeEach(() => {
    storeMocks.actions["Entity/get"].mockReset();
  });

  it("mounts", () => {
    const component = Factory.component(
      Components.EntityList,
      {
        type: "Board",
      },
      storeMocks,
      state
    );
    expect(component.vm).toBeInstanceOf(Object);
  });
  it("shows a title", () => {
    const component = Factory.component(
      Components.EntityList,
      {
        type: "Board",
        title: "Awesome Sauce!!",
      },
      storeMocks,
      state
    );

    expect(component.vm).toBeInstanceOf(Object);

    const title = component.find("div > h2");
    expect(title).toBeInstanceOf(Object);
    expect(title.text().trim()).toEqual("Awesome Sauce!!");
  });
  it("calls get when mounted", () => {
    const component = Factory.component(
      Components.EntityList,
      {
        type: "Board",
      },
      storeMocks,
      state
    );

    expect(component.vm).toBeInstanceOf(Object);
    expect(storeMocks.actions["Entity/get"].mock.calls).toHaveLength(1);
  });
});
