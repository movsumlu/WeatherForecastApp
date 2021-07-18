<template>
  <div class="weather-map" id="YMapsID"></div>
</template>

<script>
export default {
  name: "Map",
  created() {
    ymaps.ready(function () {
      var map = new ymaps.Map("YMapsID", {
        center: [46.358803, 48.059937],
        zoom: 10,
        controls: [],
      });

      var squarePlacemark = new ymaps.Placemark([46.358803, 48.059937], {
        hintContent: "Астрахань",
      });
      map.geoObjects.add(squarePlacemark);
    });
  },
};
</script>

<style lang="scss" scoped>
.weather-map {
  flex-grow: 1;
  width: auto;
  height: 100%;
}
</style>
