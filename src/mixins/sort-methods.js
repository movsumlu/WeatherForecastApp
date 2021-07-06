export default {
  methods: {
    alphaCitySort(array) {
      return array.sort((a, b) => a.city.localeCompare(b.city));
    },
    alphaReverseCitySort(array) {
      return array.sort((a, b) => b.city.localeCompare(a.city));
    },
  },
};
