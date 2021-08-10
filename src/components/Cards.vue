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
          <span class="icon icon--strips-small" />
        </div>
      </div>
      <div v-if="showSmallEmptyCard" class="small-card small-card--empty" />
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
      <div v-for="city in filteredBigCards" :key="city.city">
        <div
          class="big-card"
          @dragstart="onDragStart($event, city, 'toSmallCards')"
          draggable="true"
        >
          <div class="big-card__header">
            <span class="icon icon--strips-big" />
            <span class="big-card__city">{{ city.city }}</span>
          </div>
          <div class="big-card__content">
            <div class="big-card__content-wrapper">
              <div
                v-for="condition in weatherConditions"
                :key="condition.value"
                class="big-card__weather-conditions"
              >
                <span
                  v-if="city.weather[condition['value']]"
                  :class="['icon', `icon--${condition['value']}`]"
                />
              </div>
              <div class="big-card__wind">
                <span class="icon icon--wind" />
                <span class="big-card__wind-info"
                  >{{ windDirect(city.wind.direct) }}
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
      <div v-if="showBigEmptyCard" class="big-card big-card--empty" />
    </div>
  </section>
</template>

<script>
import Spinner from "@/components/Spinner.vue";
import helper from "@/mixins/helper";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Cards",
  components: {
    Spinner,
  },
  mixins: [helper],
  data() {
    return {
      showSmallEmptyCard: false,
      showBigEmptyCard: false,
    };
  },
  async created() {
    await this.fetchCities();
  },
  computed: {
    ...mapGetters([
      "cities",
      "showLoader",
      "bigCardsList",
      "sortDirect",
      "filters",
    ]),
    alphaSortDirect() {
      return this.sortDirect === "alpha";
    },
    filteredBigCards() {
      if (this.filters.length) {
        return this.bigCardsList.filter((bigCard) =>
          this.filters.find((filter) => bigCard.weather[`${filter}`])
        );
      } else {
        return this.bigCardsList;
      }
    },
  },
  methods: {
    ...mapMutations({
      setCities: "SET_CITIES",
      setFullListOfCities: "SET_FULL_LIST_OF_CITIES",
      setBigCardsList: "SET_BIG_CARDS_LIST",
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
        if (!this.bigCardsList.some((city) => city.city === droppedCity.city))
          this.setBigCardsList([...this.bigCardsList, droppedCity]);

        filteredArray = this.cities.filter(
          (city) => city.city !== droppedCity.city
        );

        this.alphaSortDirect
          ? this.setCities(this.alphaCitySort(filteredArray))
          : this.setCities(this.alphaRevCitySort(filteredArray));
        this.setFullListOfCities(filteredArray);
      } else {
        this.setBigCardsList(
          this.bigCardsList.filter((city) => city.city !== droppedCity.city)
        );

        if (!this.cities.some((city) => city.city === droppedCity.city)) {
          this.alphaSortDirect
            ? this.setCities(this.alphaCitySort([...this.cities, droppedCity]))
            : this.setCities(
                this.alphaRevCitySort([...this.cities, droppedCity])
              );
          this.setFullListOfCities([...this.cities, droppedCity]);
        }
      }
    },
    correctValueOfTemp(temperature) {
      return Math.sign(temperature) !== 1 ? temperature : `+${temperature}`;
    },
    windDirect(direct) {
      return direct ? direct + "," : "";
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

    &__sort {
      .sort-form__group:nth-child(3) {
        width: 292px;
      }
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
        cursor: grab;
        background-color: var(--color-blue-light);
        .small-card__city,
        .small-card__temperature {
          color: var(--color-text-white);
        }
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

        .big-card {
          &__header {
            background-color: var(--color-transparent);
          }

          &__content {
            background-color: var(--color-blue-deep);
          }
        }
      }

      &__wind-info {
        margin-left: 10px;
        color: var(--color-text-light-blue);
        opacity: 0.8;
        transition: color var(--transition-base);
      }

      &__weather-conditions {
        display: inline-block;

        span {
          margin-right: 10px;
          &:first-child {
            margin-left: 2px;
          }
        }
      }

      &--empty {
        pointer-events: none;
        min-height: 172px;
        background-color: rgba(247, 248, 255, 0.3);
        border: 2px dashed var(--color-border);
      }

      &__content {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 24px 24px 20px;
        background-color: var(--color-light-grey);
        transition: background-color var(--transition-base);
      }

      &:hover {
        cursor: grab;
        background-color: var(--color-blue-light);

        .big-card__city,
        .big-card__temperature,
        .big-card__wind-info {
          color: var(--color-text-white);
        }

        .big-card {
          &__header {
            background-color: var(--color-blue-light);
          }

          &__content {
            background-color: var(--color-blue-main);
          }
        }
      }

      &:active {
        cursor: grabbing;
        filter: drop-shadow(0 8px 20px rgba(11, 23, 78, 0.5));
      }
    }
  }

  &__small-cards,
  &__big-cards {
    width: calc(50% - 2px);
    height: 100%;
    padding-bottom: 100px;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;

    > div {
      margin-bottom: 2px;
      &:last-child {
        margin-bottom: 80px;
      }
    }

    &::-webkit-scrollbar,
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
