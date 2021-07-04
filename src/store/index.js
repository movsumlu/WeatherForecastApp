import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    cities: [],
    fullListofCities: [],
    showLoader: true,
  },
  getters: {
    cities: (state) => state.cities,
    fullListofCities: (state) => state.fullListofCities,
    showLoader: (state) => state.showLoader,
  },
  mutations: {
    SET_CITIES(state, data = []) {
      state.cities = data;
    },
    SET_FULL_LIST_OF_CITIES(state, data = []) {
      state.fullListofCities = data;
    },
    SET_LOADER(state, data) {
      state.showLoader = data;
    },
  },
  actions: {
    async fetchCities({ commit }) {
      try {
        await axios
          .get("https://geo-weather-json.herokuapp.com/db")
          .then((response) => {
            commit("SET_CITIES", response.data.cities);
            commit("SET_FULL_LIST_OF_CITIES", response.data.cities);
            commit("SET_LOADER", false);
          });
      } catch (error) {
        console.error(error);
      }
    },
  },
});
