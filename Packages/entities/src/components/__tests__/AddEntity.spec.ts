import Factory from "./__factory";
import Components from "../index";

describe("AddEntity.vue", () => {
  it("mounts", () => {
    const component = Factory.component(Components.AddEntity, {
      type: "Stage",
    });
    expect(component.isVueInstance).toBeTruthy();
  });

  it("should have the correct button label on mount", () => {
    const component = Factory.component(Components.AddEntity, {
      type: "Stage",
      properties: "Name",
    });
    expect(
      component
        .find("button")
        .text()
        .trim()
    ).toEqual("Add Stage");
  });

  it("should emit toggle when the Add button is clicked", async () => {
    const component = Factory.component(Components.AddEntity, {
      type: "Stage",
      properties: "Name",
    });

    component.find("button").trigger("click");

    await component.vm.$nextTick();

    expect(component.emitted().toggle.length).toBe(1);
  });

  it("should should show form when Add button is clicked", async () => {
    const component = Factory.component(Components.AddEntity, {
      type: "Stage",
      properties: "Name",
    });

    component.find("button").trigger("click");

    await component.vm.$nextTick();

    expect(component.find("form").exists()).toBeTruthy();
  });

  it("should show form with an input field for a single property", async () => {
    const component = await Factory.componentWithData(
      Components.AddEntity,
      {
        type: "Stage",
        properties: "Name",
      },
      {
        showAdd: true,
      }
    );

    expect(component.find("div.add-wrapper").exists()).toBeTruthy();
    const input = component.find("input");
    expect(input.exists()).toBeTruthy();
    expect(input.attributes("type")).toBe("text");
    expect(input.attributes("name")).toBe("Name");
    expect(input.attributes("placeholder")).toBe("Enter Stage Name...");
  });

  it("should save item on add button click", async () => {
    const mocks = {
      actions: { "Entity/save": jest.fn(), },
      mutations: { },
      getters: {}
    };

    const component = await Factory.componentWithData(
      Components.AddEntity,
      {
        type: "Stage",
        properties: "Name",
      },
      {
        showAdd: true,
      },
      mocks
    );

    const input = component.find("input");

    input.setValue("New");
    await component.vm.$nextTick();

    component.find("button").trigger("click");
    await component.vm.$nextTick();

    expect(mocks.actions["Entity/save"]).toHaveBeenCalledTimes(1);

    const testSaveParams = {
      type: "Stage",
      entity: { Name: "New" },
    };

    expect(mocks.actions["Entity/save"].mock.calls[0][1]).toEqual(testSaveParams);
  });

  it("should add defaultValues to entity when saved", async () => {
    const mocks = {
      actions: { "Entity/save": jest.fn() },
      mutations: { },
      getters: { }
    };

    const component = await Factory.componentWithData(
      Components.AddEntity,
      {
        type: "Stage",
        properties: "Name",
        defaultValues: {
          Board: {
            Id: "123",
          },
        },
      },
      {
        showAdd: true,
      },
      mocks
    );

    const input = component.find("input");

    input.setValue("New");
    await component.vm.$nextTick();

    component.find("button").trigger("click");
    await component.vm.$nextTick();

    expect(mocks.actions["Entity/save"]).toHaveBeenCalledTimes(1);

    const testSaveParams = {
      type: "Stage",      
      entity: { Name: "New", Board: { Id: "123" } },
    };

    const result = mocks.actions["Entity/save"].mock.calls[0][1];
    expect(result).toEqual(testSaveParams);
  });

  it("should emit added entity when saved", async () => {
    const mocks = {
      actions: { "Entity/save": jest.fn() },
      mutations: { },
      getters: { }
    };

    const component = await Factory.componentWithData(
      Components.AddEntity,
      {
        type: "Stage",
        properties: "Name",
        defaultValues: {
          Board: {
            Id: "123",
          },
        },
      },
      {
        showAdd: true,
      },
      mocks
    );

    const input = component.find("input");

    input.setValue("New");
    await component.vm.$nextTick();

    component.find("button").trigger("click");
    await component.vm.$nextTick();

    expect(component.emitted()["entity-added"].length).toBe(1);
    expect(component.emitted()["entity-added"][0][0]).toBeTruthy();
    
  });
});
