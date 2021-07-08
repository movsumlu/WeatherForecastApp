export default {
  data() {
    return {
      weatherConditions: [
        {
          value: "rainy",
        },
        {
          value: "sunny",
        },
        {
          value: "cloudy",
        },
        {
          value: "snowy",
        },
        {
          value: "stormy",
        },
        {
          value: "blizzard",
        },
        {
          value: "metorite",
        },
      ],
    };
  },
  methods: {
    alphaCitySort(array) {
      return array.sort((a, b) => a.city.localeCompare(b.city));
    },
    alphaReverseCitySort(array) {
      return array.sort((a, b) => b.city.localeCompare(a.city));
    },
  },
};
