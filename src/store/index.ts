import { createStore } from "vuex";
import axios from "axios";

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
    cities: (state) => state.cities,
    fullListofCities: (state) => state.fullListofCities,
    bigCardsList: (state) => state.bigCardsList,
    showLoader: (state) => state.showLoader,
    sortDirect: (state) => state.sortDirect,
    filters: (state) => state.filters,
  },
  mutations: {
    SET_CITIES(state, data = []) {
      state.cities = data;
    },
    SET_FULL_LIST_OF_CITIES(state, data = []) {
      state.fullListofCities = data;
    },
    SET_BIG_CARDS_LIST(state, data = []) {
      state.bigCardsList = data;
    },
    SET_LOADER(state, data) {
      state.showLoader = data;
    },
    SET_SORT_DIRECTION(state, data) {
      state.sortDirect = data;
    },
    SET_FILTERS(state, data = []) {
      state.filters = data;
    },
  },
  actions: {
    async fetchCities({ commit }) {
      try {
        await axios
          .get("https://geo-weather-json.herokuapp.com/db")
          .then((response) => {
            const sortedCities = response.data.cities.sort((a: any, b: any) =>
              a.city.localeCompare(b.city)
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
