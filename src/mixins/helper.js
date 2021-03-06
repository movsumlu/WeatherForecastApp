export default {
  data: () => ({
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
  }),
  methods: {
    alphaCitySort(array) {
      return array.sort((a, b) =>
        a.city.localeCompare(b.city)
      );
    },
    alphaRevCitySort(array) {
      return array.sort((a, b) =>
        b.city.localeCompare(a.city)
      );
    },
  },
};
