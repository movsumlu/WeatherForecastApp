<template>
  <div id="weather-map" />
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Map",
  data() {
    return {
      initCoordinate: [55.670559, 37.609218],
    };
  },
  created() {
    ymaps.ready(this.initMap);
  },
  computed: {
    ...mapGetters(["bigCardsList"]),
    bigCardsListLength() {
      return this.bigCardsList.length;
    },
  },
  watch: {
    bigCardsListLength(newCountOfLength) {
      newCountOfLength
        ? this.bigCardsList.forEach((city) => {
            this.addNewPlacemark(
              [city.coordinates.latitude, city.coordinates.longitude],
              city.city
            );
            this.map.panTo([
              city.coordinates.latitude,
              city.coordinates.longitude,
            ]);
          })
        : this.map.panTo(this.initCoordinate);
    },
  },
  methods: {
    initMap() {
      this.map = new ymaps.Map("weather-map", {
        center: this.initCoordinate,
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
