<template>
  <div class="weather-app__cards">
    <Header />
    <Cards />
  </div>
  <Map />
</template>

<script>
import Header from "@/components/Header";
import Cards from "@/components/Cards.vue";
import Map from "@/components/Map.vue";

export default {
  components: {
    Header,
    Cards,
    Map,
  },
};
</script>
