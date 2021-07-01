<template>
  <section class="weather-content__result">
    <div class="weather-content__small-cards">
      <div class="small-card small-card--shadow">
        <span class="small-card__city"> Чебоксары </span>
        <span class="small-card__temperature">+17°</span>
        <span class="icon icon--strips-small"></span>
      </div>
      <div class="small-card">
        <span class="small-card__city"> Чебоксары </span>
        <span class="small-card__temperature">+17°</span>
        <span class="icon icon--strips-small"></span>
      </div>
    </div>
    <div class="weather-content__big-cards">
      <div class="weather-content__help">
        Перетащите сюда города, погода в которых вам интересна
      </div>
      <div class="big-card">
        <div class="big-card__header">
          <span class="icon icon--strips-big"></span>
          <span class="big-card__city">Великий Новгород</span>
        </div>
        <div class="big-card__content">
          <div class="big-card__content-wrapper">
            <div class="big-card__weather-conditions">
              <span class="icon icon--rainy"></span>
              <span class="icon icon--meteor-shower"></span>
              <span class="icon icon--tornado"></span>
            </div>
            <div class="big-card__wind">
              <span class="icon icon--wind"></span>
              <span class="big-card__wind-info">Ветер ЮВ, 0-1 м/с</span>
            </div>
          </div>
          <span class="big-card__temperature">+12°</span>
        </div>
      </div>
      <div class="big-card big-card--shadow">
        <div class="big-card__header">
          <span class="icon icon--strips-big"></span>
          <span class="big-card__city">Великий Новгород</span>
        </div>
        <div class="big-card__content">
          <div class="big-card__content-wrapper">
            <div class="big-card__weather-conditions">
              <span class="icon icon--rainy"></span>
              <span class="icon icon--meteor-shower"></span>
              <span class="icon icon--tornado"></span>
            </div>
            <div class="big-card__wind">
              <span class="icon icon--wind"></span>
              <span class="big-card__wind-info">Ветер ЮВ, 0-1 м/с</span>
            </div>
          </div>
          <span class="big-card__temperature">+12°</span>
        </div>
      </div>
      <div class="big-card big-card--empty"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: "LeftSideBar",
};
</script>
