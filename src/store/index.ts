import axios from "axios";
import { createStore } from "vuex";
import { ObjectOfCity } from "@/types/WFTypes.interface";

export default createStore({
  state: {
    smallCardsList: [],
    bigCardsList: [],
    fullListOfCities: [],
    filters: [],
    showLoader: true,
    sortDirect: "alpha",
  },
  getters: {
    smallCardsList: (state) => state.smallCardsList,
    bigCardsList: (state) => state.bigCardsList,
    fullListOfCities: (state) => state.fullListOfCities,
    filters: (state) => state.filters,
    showLoader: (state) => state.showLoader,
    sortDirect: (state) => state.sortDirect,
  },
  mutations: {
    SET_SMALL_CARDS_LIST(state, payload) {
      state.smallCardsList = payload;
    },
    SET_FULL_LIST_OF_CITIES(state, payload) {
      state.fullListOfCities = payload;
    },
    SET_BIG_CARDS_LIST(state, payload) {
      state.bigCardsList = payload;
    },
    SET_FILTERS(state, payload) {
      state.filters = payload;
    },
    SET_LOADER(state, payload) {
      state.showLoader = payload;
    },
    SET_SORT_DIRECTION(state, payload) {
      state.sortDirect = payload;
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
