import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    cities: [],
  },
  mutations: {
    SET_CITIES(state, data = []) {
      state.cities = data;
    },
  },
  actions: {
    async getСities({ commit }) {
      await axios
        .get("https://geo-weather-json.herokuapp.com/db")
        .then((response) => {
          commit("SET_CITIES", response.data.cities);
        });
    },
  },
});
