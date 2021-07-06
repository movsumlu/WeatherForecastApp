export default {
  methods: {
    alphaCitySort(array) {
      return array.sort((a, b) => a.city.localeCompare(b.city));
    },
    alphaReverseCitySort(array) {
      return array.sort((a, b) => b.city.localeCompare(a.city));
    },
    weatherConditions() {
      return [
        {
          value: "rainy",
          checked: false,
        },
        {
          value: "sunny",
          checked: false,
        },
        {
          value: "cloudy",
          checked: false,
        },
        {
          value: "snowy",
          checked: false,
        },
        {
          value: "stormy",
          checked: false,
        },
        {
          value: "blizzard",
          checked: false,
        },
        {
          value: "metorite",
          checked: false,
        },
      ];
    },
  },
};
