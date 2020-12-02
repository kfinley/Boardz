import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Boards from "@/views/Boards.vue";

const localVue = createLocalVue();

localVue.use(VueRouter);

localVue.use(Vuex);
localVue.use(VueRouter);

localVue.use(Vuex);

// Mocking the vuex store
const testBoards = [{ name: "Test" }];

const getters = {
  boards: jest.fn().mockReturnValue(testBoards),
};

const actions = {
  fetchBoards: jest.fn().mockReturnValue(testBoards),
};

const store = new Vuex.Store({
  modules: {
    Boards: {
      namespaced: true,
      getters,
      actions,
    },
  },
});

describe("Boards.vue", () => {
  it("Boards View renders", () => {
    const wrapper = mount(Boards, {
      store,
      localVue,
      mocks: {
        $Progress: {
          start: jest.fn(),
          finish: jest.fn(),
          fail: jest.fn(),
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
