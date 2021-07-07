<template>
  <section class="weather-content__result">
    <div
      v-if="!showLoader"
      class="weather-content__small-cards"
      @drop="onDrop($event, 'toSmallCards')"
      @dragenter.prevent
      @dragover.prevent
    >
      <div v-for="city in cities" :key="city.city">
        <div
          class="small-card"
          @dragstart="onDragStart($event, city, 'toBigCards')"
          draggable="true"
        >
          <span class="small-card__city"> {{ city.city }} </span>
          <span class="small-card__temperature"
            >{{ correctValueOfTemp(city.temperature) }}°C</span
          >
          <span class="icon icon--strips-small"></span>
        </div>
      </div>
      <div v-if="showSmallEmptyCard" class="small-card small-card--empty"></div>
    </div>
    <Spinner v-else />
    <div
      class="weather-content__big-cards"
      @drop="onDrop($event, 'toBigCards')"
      @dragenter.prevent
      @dragover.prevent
    >
      <div class="weather-content__help">
        Перетащите сюда города, погода в которых вам интересна
      </div>
      <div v-for="city in bigCardsList" :key="city.city">
        <div
          class="big-card"
          @dragstart="onDragStart($event, city, 'toSmallCards')"
          draggable="true"
        >
          <div class="big-card__header">
            <span class="icon icon--strips-big"></span>
            <span class="big-card__city">{{ city.city }}</span>
          </div>
          <div class="big-card__content">
            <div class="big-card__content-wrapper">
              <div class="big-card__weather-conditions">
                <span v-if="city.weather.rainy" class="icon icon--rainy"></span>
                <span v-if="city.weather.sunny" class="icon icon--sunny"></span>
                <span
                  v-if="city.weather.cloudy"
                  class="icon icon--cloudy"
                ></span>
                <span v-if="city.weather.snowy" class="icon icon--snowy"></span>
                <span
                  v-if="city.weather.stormy"
                  class="icon icon--stormy"
                ></span>
                <span
                  v-if="city.weather.blizzard"
                  class="icon icon--blizzard"
                ></span>
                <span
                  v-if="city.weather.metorite"
                  class="icon icon--metorite"
                ></span>
              </div>
              <div class="big-card__wind">
                <span class="icon icon--wind"></span>
                <span class="big-card__wind-info"
                  >{{ windDirection(city.wind.direction) }}
                  {{ windSpeed(city.wind.speed) }}</span
                >
              </div>
            </div>
            <span class="big-card__temperature"
              >{{ correctValueOfTemp(city.temperature) }}°C</span
            >
          </div>
        </div>
      </div>
      <div v-if="showBigEmptyCard" class="big-card big-card--empty"></div>
    </div>
  </section>
</template>

<script>
import Spinner from "@/components/Spinner.vue";
import sortMethods from "@/mixins/sort-methods";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Cards",
  components: {
    Spinner,
  },
  mixins: [sortMethods],
  data() {
    return {
      bigCardsList: [],
      showSmallEmptyCard: false,
      showBigEmptyCard: false,
    };
  },
  async created() {
    await this.fetchCities();
  },
  computed: {
    ...mapGetters(["cities", "showLoader", "sortingDirection"]),
    alphaSortDirection() {
      return this.sortingDirection === "alphabetically";
    },
  },
  methods: {
    ...mapMutations({
      setCities: "SET_CITIES",
      setFullListOfCities: "SET_FULL_LIST_OF_CITIES",
    }),
    ...mapActions(["fetchCities"]),
    onDragStart(event, city, type) {
      event.dataTransfer.setData("droppedCity", JSON.stringify(city));
      type === "toBigCards"
        ? (this.showBigEmptyCard = true)
        : (this.showSmallEmptyCard = true);
    },
    onDrop(event, type) {
      const droppedCity = JSON.parse(event.dataTransfer.getData("droppedCity"));
      this.showBigEmptyCard = this.showSmallEmptyCard = false;
      let filteredArray = [];

      if (type === "toBigCards") {
        this.bigCardsList.push(droppedCity);

        filteredArray = this.cities.filter(
          (city) => city.city !== droppedCity.city
        );

        this.alphaSortDirection
          ? this.setCities(this.alphaCitySort(filteredArray))
          : this.setCities(this.alphaReverseCitySort(filteredArray));
        this.setFullListOfCities(filteredArray);
      } else {
        this.bigCardsList = this.bigCardsList.filter(
          (city) => city.city !== droppedCity.city
        );

        this.alphaSortDirection
          ? this.setCities(this.alphaCitySort([...this.cities, droppedCity]))
          : this.setCities(
              this.alphaReverseCitySort([...this.cities, droppedCity])
            );
        this.setFullListOfCities([...this.cities, droppedCity]);
      }
    },
    correctValueOfTemp(temperature) {
      return Math.sign(temperature) !== 1 ? temperature : `+${temperature}`;
    },
    windDirection(direction) {
      return direction ? direction + "," : "";
    },
    windSpeed(speed) {
      return speed ? speed + " м/с" : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.weather-content {
  &__result {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 2px 4px 0 4px;

    &__big-cards {
      position: relative;
      z-index: 1;
    }

    &__help {
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
  }
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

.weather-content__sort .sort-form__group:nth-child(1) {
  width: 82px;
}

.weather-content__sort .sort-form__group:nth-child(1) div:nth-child(2n),
.weather-content__sort .sort-form__group:nth-child(3) div:nth-child(7n) {
  margin-right: 0;
}

.weather-content__sort .sort-form__group:nth-child(3) {
  width: 292px;
}

.small-card {
  display: flex;
  align-items: center;
  width: 350px;
  padding: 16px 20px;
  background-color: var(--color-light-grey);
  border-radius: 2px;
  outline: none;
  transition: background-color var(--transition-base),
    filter var(--transition-base);

  span {
    user-select: none;
  }

  &:hover {
    background-color: var(--color-blue-light);
  }

  &__city {
    flex-grow: 1;
    margin-right: 20px;
    transition: color var(--transition-base);
  }

  &__temperature {
    margin-right: 20px;
    font-size: 24px;
    line-height: 24px;
    letter-spacing: -0.02em;
    transition: color var(--transition-base);
  }

  &:active {
    cursor: grabbing;
    filter: drop-shadow(0 8px 20px rgba(11, 23, 78, 0.5));
  }

  &--shadow {
    pointer-events: none;
    background-color: var(--color-shadow-main);
  }

  &--empty {
    pointer-events: none;
    min-height: 56px;
    background-color: rgba(247, 248, 255, 0.3);
    border: 2px dashed var(--color-border);
  }
}

.big-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  min-height: 172px;
  border-radius: 2px;
  outline: none;
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

  &--shadow {
    pointer-events: none;
    opacity: 0.3;
    background-color: var(--color-blue-light);
  }

  &__wind-info {
    margin-left: 10px;
    color: var(--color-text-light-blue);
    opacity: 0.8;
    transition: color var(--transition-base);
  }

  &__weather-conditions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: -2px;

    span {
      margin-right: 10px;
      margin-bottom: 2px;
    }
  }

  &:active {
    cursor: grabbing;
    filter: drop-shadow(0 8px 20px rgba(11, 23, 78, 0.5));
  }

  &--empty {
    pointer-events: none;
    min-height: 172px;
    background-color: rgba(247, 248, 255, 0.3);
    border: 2px dashed var(--color-border);
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

.big-card__weather-conditions span:last-child {
  margin-right: 0;
}

.big-card:hover .big-card__header {
  background-color: var(--color-blue-light);
}

.big-card:hover .big-card__content {
  background-color: var(--color-blue-main);
}

.big-card--shadow .big-card__header {
  background-color: var(--color-transparent);
}

.big-card--shadow .big-card__content {
  background-color: var(--color-blue-deep);
}

.small-card--shadow .small-card__city,
.small-card--shadow .small-card__temperature,
.small-card:hover .small-card__city,
.small-card:hover .small-card__temperature,
.big-card--shadow .big-card__city,
.big-card--shadow .big-card__temperature,
.big-card--shadow .big-card__wind-info,
.big-card:hover .big-card__city,
.big-card:hover .big-card__temperature,
.big-card:hover .big-card__wind-info {
  color: var(--color-text-white);
}
</style>
