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
