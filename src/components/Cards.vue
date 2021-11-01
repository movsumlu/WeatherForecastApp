<template>
  <section class="cards">
    <div
      v-if="!showLoader && smallCardsList.length"
      class="small-card__container"
      @drop="onDrop($event, 'toSmallCards')"
      @dragenter.prevent
      @dragover.prevent
    >
      <div v-for="city in smallCardsList" :key="city.city">
        <div
          class="small-card"
          @dragstart="onDragStart($event, city, 'toBigCards')"
          draggable="true"
        >
          <span class="small-card__city"> {{ city.city }} </span>
          <span class="small-card__temperature">{{
            valueOfTemperature(city.temperature)
          }}</span>
          <span class="icon icon--strips-small" />
        </div>
      </div>
      <div v-if="showSmallEmptyCard" class="small-card small-card--empty" />
    </div>
    <p
      v-else-if="!showLoader && !smallCardsList.length"
      class="small-card--empty-text"
    >
      Упс, ничего не найдено...
    </p>
    <Spinner v-else />
    <div
      class="big-card__container"
      @drop="onDrop($event, 'toBigCards')"
      @dragenter.prevent
      @dragover.prevent
    >
      <div
        v-if="!showLoader && !showBigEmptyCard && !filteredBigCards.length"
        class="cards__help"
        v-html="textOfHelp"
      ></div>
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
            <span class="big-card__temperature">{{
              valueOfTemperature(city.temperature)
            }}</span>
          </div>
        </div>
      </div>
      <div v-if="showBigEmptyCard" class="big-card big-card--empty" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, warn } from "vue";
import { useStore } from "vuex";
import Spinner from "@/components/Spinner.vue";
import helper from "@/mixins/helper";
import { ObjectOfCity } from "@/types/WFTypes.interface";

export default defineComponent({
  name: "Cards",
  components: {
    Spinner,
  },
  mixins: [helper],
  setup() {
    const store = useStore();
    const { alphaCitySort, alphaRevCitySort } = helper.methods;

    const smallCardsFromLS = JSON.parse(
      localStorage.getItem("smallCardsFromLS") || "[]"
    );

    const bigCardsFromLS = JSON.parse(
      localStorage.getItem("bigCardsFromLS") || "[]"
    );

    const fullListOfCitiesFromLS = JSON.parse(
      localStorage.getItem("fullListOfCitiesFromLS") || "[]"
    );

    if (
      smallCardsFromLS.length ||
      bigCardsFromLS.length ||
      fullListOfCitiesFromLS.length
    ) {
      store.commit("SET_SMALL_CARDS_LIST", smallCardsFromLS);
      store.commit("SET_BIG_CARDS_LIST", bigCardsFromLS);
      store.commit("SET_FULL_LIST_OF_CITIES", fullListOfCitiesFromLS);
      store.commit("SET_LOADER", false);
    } else {
      store.dispatch("fetchCities");
    }

    let showSmallEmptyCard = ref(false);
    let showBigEmptyCard = ref(false);

    const smallCardsList = computed(
      (): ObjectOfCity[] => store.getters.smallCardsList
    );

    const bigCardsList = computed(
      (): ObjectOfCity[] => store.getters.bigCardsList
    );

    const fullListOfCities = computed(
      (): ObjectOfCity[] => store.getters.fullListOfCities
    );

    const filters = computed((): string[] => store.getters.filters);
    const showLoader = computed((): boolean => store.getters.showLoader);

    const filteredBigCards = computed((): ObjectOfCity[] =>
      filters.value.length
        ? bigCardsList.value.filter((bigCard: any) =>
            filters.value.every((filter: string) => bigCard.weather[filter])
          )
        : bigCardsList.value
    );

    const alphaSortDirect = computed(
      (): boolean => store.getters.sortDirect === "alpha"
    );

    const textOfHelp = computed(
      (): string =>
        `<p> ${
          filters.value.length
            ? "Увы, нет подходящих городов"
            : "Перетащите сюда города, <br />погода в которых вам интересна"
        }</p>`
    );

    function onDragStart(
      event: DragEvent,
      city: ObjectOfCity,
      type: string
    ): void {
      if (event.dataTransfer) {
        event.dataTransfer.setData("droppedCity", JSON.stringify(city));

        type === "toBigCards"
          ? (showBigEmptyCard.value = true)
          : (showSmallEmptyCard.value = true);
      }
    }

    function onDrop(event: DragEvent, type: string): void {
      if (event.dataTransfer) {
        const droppedCity = JSON.parse(
          event.dataTransfer.getData("droppedCity")
        );

        showBigEmptyCard.value = showSmallEmptyCard.value = false;

        if (type === "toBigCards") {
          if (
            !bigCardsList.value.some(
              (city: ObjectOfCity) => city.city === droppedCity.city
            )
          )
            store.commit("SET_BIG_CARDS_LIST", [
              ...bigCardsList.value,
              droppedCity,
            ]);

          store.commit(
            "SET_SMALL_CARDS_LIST",
            alphaSortDirect.value
              ? alphaCitySort(
                  smallCardsList.value.filter(
                    (city: ObjectOfCity) => city.city !== droppedCity.city
                  )
                )
              : alphaRevCitySort(
                  smallCardsList.value.filter(
                    (city: ObjectOfCity) => city.city !== droppedCity.city
                  )
                )
          );

          store.commit(
            "SET_FULL_LIST_OF_CITIES",
            fullListOfCities.value.filter((city) =>
              bigCardsList.value.some((bigCards) => city.city !== bigCards.city)
            )
          );
        } else {
          store.commit(
            "SET_BIG_CARDS_LIST",
            bigCardsList.value.filter(
              (city: ObjectOfCity) => city.city !== droppedCity.city
            )
          );

          if (
            !smallCardsList.value.some(
              (city: ObjectOfCity) => city.city === droppedCity.city
            )
          ) {
            store.commit(
              "SET_SMALL_CARDS_LIST",
              alphaSortDirect.value
                ? alphaCitySort([...smallCardsList.value, droppedCity])
                : alphaRevCitySort([...smallCardsList.value, droppedCity])
            );

            store.commit(
              "SET_FULL_LIST_OF_CITIES",
              alphaSortDirect.value
                ? alphaCitySort([...fullListOfCities.value, droppedCity])
                : alphaRevCitySort([...fullListOfCities.value, droppedCity])
            );
          }
        }

        localStorage.setItem(
          "smallCardsFromLS",
          JSON.stringify(smallCardsList.value)
        );

        localStorage.setItem(
          "bigCardsFromLS",
          JSON.stringify(bigCardsList.value)
        );

        localStorage.setItem(
          "fullListOfCitiesFromLS",
          JSON.stringify(fullListOfCities.value)
        );
      }
    }

    function valueOfTemperature(temperature: number): string {
      return (
        (Math.sign(temperature) !== 1 ? temperature : `+${temperature}`) + "°C"
      );
    }

    function windDirect(direct: string): string {
      return direct ? direct + "," : "";
    }

    function windSpeed(speed: string): string {
      return speed ? speed + " м/с" : "";
    }

    return {
      smallCardsList,
      filteredBigCards,
      showSmallEmptyCard,
      showBigEmptyCard,
      textOfHelp,
      showLoader,
      onDragStart,
      onDrop,
      valueOfTemperature,
      windDirect,
      windSpeed,
    };
  },
});
</script>

<style lang="scss" scoped>
.cards {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 2px 4px 0 4px;

  &__sort {
    .sort-form__group:nth-child(3) {
      width: 292px;
    }
  }

  &__help {
    text-align: center;
    margin-top: 60px;
    user-select: none;
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

    &--empty-text {
      margin: 70px 0 0 110px;
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
      background-color: var(--color-text-white);
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
      padding: 16px 24px 21px 20px;
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

  .small-card__container,
  .big-card__container {
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
