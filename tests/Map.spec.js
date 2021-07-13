import { shallowMount } from "@vue/test-utils";
import Map from "@/components/Map.vue";

describe("Testing Map compo", () => {
  it("Renders weather-map container", () => {
    const wrapper = shallowMount(Map);
    expect(wrapper.findAll(".weather-map")).toHaveLength(1);
  });
});
