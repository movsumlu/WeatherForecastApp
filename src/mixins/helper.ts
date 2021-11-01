import { ObjectOfCity } from "@/types/WFTypes.interface";

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
    alphaCitySort(array: ObjectOfCity[]) {
      return array.sort((a: ObjectOfCity, b: ObjectOfCity) =>
        a.city.localeCompare(b.city)
      );
    },
    alphaRevCitySort(array: ObjectOfCity[]) {
      return array.sort((a: ObjectOfCity, b: ObjectOfCity) =>
        b.city.localeCompare(a.city)
      );
    },
  },
};
