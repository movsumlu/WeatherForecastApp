import { mount } from "@vue/test-utils";
import Spinner from "@/components/Spinner.vue";

describe("test Spinner", () => {
  it("loading text is correct", () => {
    const wrapper = mount(Spinner);
    expect(wrapper.text()).toContain("Загрузка ...");
  });
});
