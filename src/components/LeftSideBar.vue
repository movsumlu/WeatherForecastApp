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
    </div>
  </section>
</template>

<script>
export default {
  name: "LeftSideBar",
};
</script>

<style lang="scss" scoped>
.weather-content__result {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 2px 4px 0 4px;
}

.weather-content__small-cards,
.weather-content__big-cards {
  width: calc(50% - 2px);
  height: 100%;
  padding-bottom: 100px;
  overflow-y: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;
}

.weather-content__small-cards::-webkit-scrollbar,
.weather-content__big-cards::-webkit-scrollbar {
  display: none;
}

.weather-content__small-cards > div,
.weather-content__big-cards > div {
  margin-bottom: 2px;
}

.weather-content__small-cards > div:last-child,
.weather-content__big-cards > div:last-child {
  margin-bottom: 80px;
}

.weather-content__big-cards {
  position: relative;
  z-index: 1;
}

.weather-content__help {
  position: absolute;
  top: 56px;
  left: 0;
  z-index: -1;

  width: 100%;
  padding-right: 65px;
  padding-left: 65px;

  line-height: 32px;
  text-align: center;
  color: var(--color-text-help);
}

.weather-content__sort .sort-form__group:nth-child(1) {
  width: 82px;
}

.weather-content__sort .sort-form__group:nth-child(1) div:nth-child(2n) {
  margin-right: 0;
}

.weather-content__sort .sort-form__group:nth-child(3) {
  width: 292px;
}

.weather-content__sort .sort-form__group:nth-child(3) div:nth-child(7n) {
  margin-right: 0;
}

.small-card {
  display: flex;
  align-items: center;
  width: 350px;
  padding: 16px 20px;

  background-color: var(--color-light-grey);
  border-radius: 2px;
  outline: none;
  cursor: pointer;

  transition: background-color var(--transition-base),
    filter var(--transition-base);
}

.small-card:hover {
  background-color: var(--color-blue-light);
}

.small-card:hover .small-card__city,
.small-card:hover .small-card__temperature {
  color: var(--color-text-white);
}

.small-card__city {
  flex-grow: 1;
  margin-right: 20px;

  transition: color var(--transition-base);
}

.small-card__temperature {
  margin-right: 20px;

  font-size: 24px;
  line-height: 24px;
  letter-spacing: -0.02em;

  transition: color var(--transition-base);
}

.small-card:active {
  filter: drop-shadow(0 8px 20px rgba(11, 23, 78, 0.5));
}

.small-card--shadow {
  pointer-events: none;
  background-color: var(--color-shadow-main);
}

.small-card--shadow .small-card__city,
.small-card--shadow .small-card__temperature {
  color: var(--color-text-white);
}

.small-card--empty {
  pointer-events: none;
  min-height: 56px;
  background-color: rgba(247, 248, 255, 0.3);
  border: 2px dashed var(--color-border);
}

.big-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  min-height: 172px;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  transition: filter var(--transition-base);

  &__header {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 20px 20px 14px 20px;
    background-color: var(--color-white);
    transition: background-color var(--transition-base);
  }

  &__city {
    margin-left: 20px;
    font-size: 30px;
    line-height: 36px;
    transition: color var(--transition-base);
  }

  &__wind {
    display: flex;
    align-items: center;
    margin-top: 12px;
  }

  &__temperature {
    margin-left: auto;
    font-size: 64px;
    line-height: 62px;
    letter-spacing: -0.05em;
    opacity: 0.8;
    transition: color var(--transition-base);
  }

  &--empty {
    pointer-events: none;
    min-height: 172px;
    background-color: rgba(247, 248, 255, 0.3);
    border: 2px dashed var(--color-border);

    &.hidden-block {
      display: none;
    }
  }

  &--shadow {
    pointer-events: none;
    opacity: 0.3;
    background-color: var(--color-blue-light);
  }
}

.big-card .big-card__content {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px 24px 24px 20px;
  background-color: var(--color-light-grey);
  transition: background-color var(--transition-base);
}

.big-card__weather-conditions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: -2px;
}

.big-card__weather-conditions span {
  margin-right: 10px;
  margin-bottom: 2px;
}

.big-card__weather-conditions span:last-child {
  margin-right: 0;
}

.big-card__wind-info {
  margin-left: 10px;
  color: var(--color-text-light-blue);
  opacity: 0.8;
  transition: color var(--transition-base);
}

.big-card:hover .big-card__city {
  color: var(--color-text-white);
}

.big-card:hover .big-card__temperature,
.big-card:hover .big-card__wind-info {
  color: var(--color-text-white);
}

.big-card:hover .big-card__header {
  background-color: var(--color-blue-light);
}

.big-card:hover .big-card__content {
  background-color: var(--color-blue-main);
}

.big-card:active {
  filter: drop-shadow(0 8px 20px rgba(11, 23, 78, 0.5));
}

.big-card--shadow .big-card__header {
  background-color: var(--color-transparent);
}

.big-card--shadow .big-card__content {
  background-color: var(--color-blue-deep);
}

.big-card--shadow .big-card__city,
.big-card--shadow .big-card__temperature,
.big-card--shadow .big-card__wind-info {
  color: var(--color-text-white);
}
</style>
