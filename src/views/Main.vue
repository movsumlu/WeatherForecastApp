<template>
  <html lang="ru">
    <head>
      <title>Прогноз погоды</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Прогноз погоды" />
      <link
        rel="preload"
        as="font"
        href="../assets/fonts/Roboto/Roboto-Regular.woff2"
        type="font/woff2"
        crossorigin="anonymous"
      />
    </head>
    <body>
      <section class="weather-app">
        <div class="weather-app__content weather-content">
          <Header />
          <LeftSideBar />
        </div>
        <Map />
      </section>
    </body>
  </html>
</template>

<script>
import Header from "../components/Header";
import LeftSideBar from "../components/LeftSideBar.vue";
import Map from "../components/Map.vue";

export default {
  components: {
    Header,
    LeftSideBar,
    Map,
  },
};
</script>

<style>
@import "../assets/css/style.css";
</style>

<style lang="scss" scoped>
.weather-app {
  display: flex;
  width: 100%;
  min-width: 1080px;
  height: 100vh;
  min-height: 880px;
  overflow: hidden;
}

.weather-app__content {
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

.weather-app__map {
  flex-grow: 1;
  width: auto;
  height: 100%;
}
</style>
