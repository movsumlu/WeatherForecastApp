<template>
  <div id="weather-map"></div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Map",
  created() {
    let self = this;
    ymaps.ready(function () {
      var map = new ymaps.Map("weather-map", {
        center: [46.358803, 48.059937],
        zoom: 10,
        controls: [],
      });
      self.addNewPlacemark(map, [46.358803, 48.059937], "Астрахань");
    });
  },
  computed: {
    ...mapGetters(["bigCardsList"]),
  },
  methods: {
    addNewPlacemark(map, coordinates, hintContent) {
      map.geoObjects.add(
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
