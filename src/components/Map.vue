<template>
  <div id="weather-map"></div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Map",
  created() {
    ymaps.ready(this.initMap);
  },
  computed: {
    ...mapGetters(["bigCardsList"]),
    countOfBigCardsList() {
      if (this.bigCardsList.length) {
        this.bigCardsList.forEach((city) => {
          this.addNewPlacemark(
            [city.coordinates.latitude, city.coordinates.longitude],
            city.city
          );
          this.map.panTo([
            city.coordinates.latitude,
            city.coordinates.longitude,
          ]);
        });
      } else {
        this.map.panTo([55.751244, 37.618423]);
      }
      return this.bigCardsList.length;
    },
  },
  methods: {
    initMap() {
      this.map = new ymaps.Map("weather-map", {
        center: [55.751244, 37.618423],
        zoom: 10,
        controls: [],
      });
    },
    addNewPlacemark(coordinates, hintContent) {
      this.map.geoObjects.add(
        new ymaps.Placemark(coordinates, {
          hintContent: hintContent,
        })
      );
    },
  },
};
</script>

<style lang="scss" scoped>
#weather-map {
  flex-grow: 1;
  width: auto;
  height: 100%;
}
</style>
