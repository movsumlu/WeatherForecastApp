<template>
  <section class="weather-app">
    <router-view />
  </section>
</template>

<style lang="scss">
@import "~@/assets/css/style.scss";

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  font-size: 20px;
  font-family: var(--font-family);
  color: var(--color-text-main);
}

.weather-app {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  &__cards {
    position: relative;
    z-index: 1;
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
    width: 24px;
    height: 24px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;

    &--strips-big {
      width: 6px;
      height: 22px;
      background-image: url("~@/assets/icons/icon-strips-big.svg");
    }

    &--strips-small {
      width: 6px;
      height: 16px;
      background-image: url("~@/assets/icons/icon-strips-small.svg");
    }

    &--arrow-down {
      background-image: url("~@/assets/icons/icon-arrow-down.svg");
    }

    &--arrow-up {
      background-image: url("~@/assets/icons/icon-arrow-up.svg");
    }

    &--rainy {
      background-image: url("~@/assets/icons/icon-rainy.svg");
    }

    &--sunny {
      background-image: url("~@/assets/icons/icon-sunny.svg");
    }

    &--cloudy {
      background-image: url("~@/assets/icons/icon-cloudy.svg");
    }

    &--snowy {
      background-image: url("~@/assets/icons/icon-snowy.svg");
    }

    &--stormy {
      background-image: url("~@/assets/icons/icon-stormy.svg");
    }

    &--blizzard {
      background-image: url("~@/assets/icons/icon-blizzard.svg");
    }

    &--metorite {
      background-image: url("~@/assets/icons/icon-metorite.svg");
    }

    &--wind {
      background-image: url("~@/assets/icons/icon-wind.svg");
    }
  }
}
</style>
