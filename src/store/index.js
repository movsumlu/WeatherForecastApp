import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    cities: [],
  },
  getters: {
    cities: (state) => state.cities,
  },
  mutations: {
    SET_CITIES(state, data = []) {
      state.cities = data;
    },
  },
  actions: {
    async fetchCities({ commit }) {
      try {
        await axios
          .get("https://geo-weather-json.herokuapp.com/db")
          .then((response) => {
            commit("SET_CITIES", response.data.cities);
          });
      } catch (error) {
        console.error(error);
      }
    },
  },
});
