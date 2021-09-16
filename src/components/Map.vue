<template>
  <div id="map" style="flex-grow: 1" />
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Map",
  setup() {
    const store = useStore();

    const initCoordinate = ref([55.670559, 37.609218]);

    const bigCardsList = computed(() => store.getters.bigCardsList);

    const bigCardsListLength = computed(
      () => store.getters.bigCardsList.length
    );

    return {
      initCoordinate,
      bigCardsList,
      bigCardsListLength,
    };
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
  created() {
    ymaps.ready(this.initMap);
  },
  methods: {
    initMap() {
      this.map = new ymaps.Map("map", {
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
