<template>
  <section class="weather-app">
    <div class="weather-app__cards">
      <Header />
      <Cards />
    </div>
    <Map />
  </section>
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

<style lang="scss">
@import "~@/assets/css/style.css";

.weather-app {
  display: flex;
  width: 100%;
  min-width: 1080px;
  height: 100vh;
  min-height: 880px;
  overflow: hidden;

  &__cards {
    position: relative;
    z-index: 1;
    flex-shrink: 0;
    width: 712px;
    height: 100vh;
    min-height: 880px;
    overflow: hidden;
    background: var(--color-blue-lightest);
    box-shadow: 0 0 40px rgba(11, 23, 78, 0.5);
  }

  #map {
    flex-grow: 1;
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;

    &--strips-big {
      width: 6px;
      height: 22px;
      background-image: url("~@/assets/img/icons/icon-strips-big.svg");
    }

    &--strips-small {
      width: 6px;
      height: 16px;
      background-image: url("~@/assets/img/icons/icon-strips-small.svg");
    }

    &--arrow-down {
      background-image: url("~@/assets/img/icons/icon-arrow-down.svg");
    }

    &--arrow-up {
      background-image: url("~@/assets/img/icons/icon-arrow-up.svg");
    }

    &--rainy {
      background-image: url("~@/assets/img/icons/icon-rainy.svg");
    }

    &--sunny {
      background-image: url("~@/assets/img/icons/icon-sunny.svg");
    }

    &--cloudy {
      background-image: url("~@/assets/img/icons/icon-cloudy.svg");
    }

    &--snowy {
      background-image: url("~@/assets/img/icons/icon-snowy.svg");
    }

    &--stormy {
      background-image: url("~@/assets/img/icons/icon-stormy.svg");
    }

    &--blizzard {
      background-image: url("~@/assets/img/icons/icon-blizzard.svg");
    }

    &--metorite {
      background-image: url("~@/assets/img/icons/icon-metorite.svg");
    }

    &--wind {
      background-image: url("~@/assets/img/icons/icon-wind.svg");
    }
  }
}
</style>
