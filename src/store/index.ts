import axios from "axios";
import { createStore } from "vuex";
import ObjectOfCity from "@/models/Models";

export default createStore({
  state: {
    cities: [],
    fullListofCities: [],
    bigCardsList: [],
    showLoader: true,
    sortDirect: "alpha",
    filters: [],
  },
  getters: {
    cities: (state): ObjectOfCity[] => state.cities,
    fullListofCities: (state): ObjectOfCity[] => state.fullListofCities,
    bigCardsList: (state): ObjectOfCity[] => state.bigCardsList,
    showLoader: (state): boolean => state.showLoader,
    sortDirect: (state): string => state.sortDirect,
    filters: (state): string[] => state.filters,
  },
  mutations: {
    SET_CITIES(state, payload: []) {
      state.cities = payload;
    },
    SET_FULL_LIST_OF_CITIES(state, payload: []) {
      state.fullListofCities = payload;
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
            commit("SET_CITIES", sortedCities);
            commit("SET_FULL_LIST_OF_CITIES", sortedCities);
            commit("SET_LOADER", false);
          });
      } catch (error) {
        console.error(error);
      }
    },
  },
});