import axios from "axios";
import { createStore } from "vuex";
import ObjectOfCity from "@/models/Models";

export default createStore({
  state: {
    smallCardsList: [],
    bigCardsList: [],
    fullListOfCities: [],
    showLoader: true,
    sortDirect: "alpha",
    filters: [],
  },
  getters: {
    smallCardsList: (state): ObjectOfCity[] => state.smallCardsList,
    bigCardsList: (state): ObjectOfCity[] => state.bigCardsList,
    fullListOfCities: (state): ObjectOfCity[] => state.fullListOfCities,
    showLoader: (state): boolean => state.showLoader,
    sortDirect: (state): string => state.sortDirect,
    filters: (state): string[] => state.filters,
  },
  mutations: {
    SET_SMALL_CARDS_LIST(state, payload: []) {
      state.smallCardsList = payload;
    },
    SET_FULL_LIST_OF_CITIES(state, payload: []) {
      state.fullListOfCities = payload;
    },
    SET_BIG_CARDS_LIST(state, payload: []) {
      state.bigCardsList = payload;
    },
    SET_LOADER(state, payload: boolean) {
      state.showLoader = payload;
    },
    SET_SORT_DIRECTION(state, payload: string) {
      state.sortDirect = payload;
    },
    SET_FILTERS(state, payload: []) {
      state.filters = payload;
    },
  },
  actions: {
    async fetchCities({ commit }) {
      try {
        await axios
          .get("https://geo-weather-json.herokuapp.com/db")
          .then((response) => {
            const sortedCities = response.data.cities.sort(
              (a: ObjectOfCity, b: ObjectOfCity) => a.city.localeCompare(b.city)
            );
            commit("SET_SMALL_CARDS_LIST", sortedCities);
            commit("SET_FULL_LIST_OF_CITIES", sortedCities);
            commit("SET_LOADER", false);
          });
      } catch (error) {
        console.error(error);
      }
    },
  },
});
