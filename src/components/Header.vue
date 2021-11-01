<template>
  <section class="header">
    <div class="header__group">
      <div class="header__wrapper--radio" @click="sortAlpha">
        <input
          id="alphabet-sort"
          type="radio"
          name="alphabet-sort"
          value="alphabet-sort"
          checked
        />
        <label for="alphabet-sort">
          <span class="icon icon--arrow-down" />
        </label>
      </div>
      <div class="header__wrapper--radio" @click="sortAlphaRev">
        <input
          id="alphabet-sort-reverse"
          type="radio"
          name="alphabet-sort"
          value="alphabet-sort-reverse"
        />
        <label for="alphabet-sort-reverse">
          <span class="icon icon--arrow-up" />
        </label>
      </div>
    </div>
    <div class="header__group">
      <div class="header__wrapper--search">
        <input
          type="search"
          v-model="seachCityName"
          @focus="inputFocused = true"
          @blur="inputFocused = false"
          :placeholder="placeholderText"
        />
      </div>
    </div>
    <div class="header__group">
      <div
        v-for="condition in weatherConditions"
        :key="condition.value"
        class="header__wrapper--checkbox"
      >
        <input type="checkbox" :id="condition.value" />
        <label :for="condition.value" @click="updateFilters(condition.value)">
          <span :class="['icon', `icon--${condition.value}`]" />
        </label>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "vuex";
import helper from "@/mixins/helper";
import { ObjectOfCity } from "@/types/WFTypes.interface";

export default defineComponent({
  name: "Header",
  mixins: [helper],
  setup() {
    const store = useStore();
    const { alphaCitySort, alphaRevCitySort } = helper.methods;

    const inputFocused = ref(false);
    const seachCityName = ref(localStorage.getItem("seachNameFromLS") || "");

    store.commit(
      "SET_SORT_DIRECTION",
      localStorage.getItem("sordDirectionFromLS") || "alpha"
    );

    store.commit(
      "SET_FILTERS",
      JSON.parse(localStorage.getItem("filtersFromLS") || "[]")
    );

    const smallCardsList = computed(
      (): ObjectOfCity[] => store.getters.smallCardsList
    );

    const fullListOfCities = computed(
      (): ObjectOfCity[] => store.getters.fullListOfCities
    );

    const filters = computed((): string[] => store.getters.filters);

    const placeholderText = computed((): string =>
      inputFocused.value ? "" : "Название города"
    );

    watch(
      seachCityName,
      () => {
        localStorage.setItem("seachNameFromLS", seachCityName.value);

        store.commit(
          "SET_SMALL_CARDS_LIST",
          fullListOfCities.value.filter((city: ObjectOfCity) =>
            city.city.toLowerCase().includes(seachCityName.value.toLowerCase())
          )
        );
      },
      { immediate: true }
    );

    function updateFilters(value: string): void {
      let filteredFilter = filters.value.includes(value)
        ? filters.value.filter((filter: string) => filter !== value)
        : [...filters.value, value];

      localStorage.setItem("filtersFromLS", JSON.stringify(filteredFilter));
      store.commit("SET_FILTERS", filteredFilter);
    }

    function sortAlpha(): void {
      localStorage.setItem("sordDirectionFromLS", "alpha");
      store.commit("SET_SORT_DIRECTION", "alpha");
      store.commit("SET_SMALL_CARDS_LIST", alphaCitySort(smallCardsList.value));
    }

    function sortAlphaRev(): void {
      localStorage.setItem("sordDirectionFromLS", "alphaRev");
      store.commit("SET_SORT_DIRECTION", "alphaRev");
      store.commit(
        "SET_SMALL_CARDS_LIST",
        alphaRevCitySort(smallCardsList.value)
      );
    }

    return {
      inputFocused,
      seachCityName,
      placeholderText,
      updateFilters,
      sortAlpha,
      sortAlphaRev,
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  min-width: 712px;
  padding: 12px 20px;
  background-color: var(--color-blue-main);

  &__group {
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    flex-shrink: 0;
    margin: 0 20px -2px 0;

    & > div {
      margin: 0 2px 2px 0;
    }
  }

  &__wrapper {
    display: flex;
    &--search {
      input {
        width: 230px;
        padding: 10px 20px;
        color: var(--color-text-input);
        font-size: 18px;
        background-color: var(--color-input-base);
        border: none;
        outline: none;
        &:focus {
          background-color: var(--color-input-focus);
        }
        &:hover {
          box-shadow: 0 4px 10px rgba(11, 23, 78, 0.5);
        }
        &::placeholder {
          color: var(--color-text-placeholder);
        }
      }
    }

    &--radio,
    &--checkbox {
      label {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        background-color: var(--color-label-base);
        border-radius: 2px;
        cursor: pointer;
        transition: background-color var(--transition-base),
          box-shadow var(--transition-base);
        user-select: none;
      }

      input {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        clip: rect(0 0 0 0);

        &:checked + label {
          background-color: var(--color-label-active);
          box-shadow: none;
        }
      }

      &:hover {
        background-color: var(--color-label-hover);
        box-shadow: 0 4px 10px rgba(11, 23, 78, 0.5);
      }
    }
  }
}
</style>
