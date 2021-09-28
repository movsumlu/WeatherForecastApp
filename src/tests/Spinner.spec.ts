import { mount } from "@vue/test-utils";
import Spinner from "@/components/Spinner.vue";

describe("testing Spinner", () => {
  it("loading text renders correctly", () => {
    const wrapper = mount(Spinner);
    const loaderTextElement = wrapper.find(".loader--text");
    expect(loaderTextElement.text()).toBe("Загрузка ...");
  });
});
