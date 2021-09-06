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
    alphaCitySort(array: string[]) {
      return array.sort((a: any, b: any) => a.city.localeCompare(b.city));
    },
    alphaRevCitySort(array: string[]) {
      return array.sort((a: any, b: any) => b.city.localeCompare(a.city));
    },
  },
};
