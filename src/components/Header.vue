<template>
  <section class="sort-form">
    <div class="sort-form__group">
      <div class="sort-form__input-wrapper input-wrapper--radio">
        <input
          id="alphabet-sort"
          type="radio"
          name="alphabet-sort"
          value="alphabet-sort"
          checked
        />
        <label for="alphabet-sort">
          <span class="icon icon--arrow-down" @click="sortAlpha"></span>
        </label>
      </div>
      <div class="sort-form__input-wrapper input-wrapper--radio">
        <input
          id="alphabet-sort-reverse"
          type="radio"
          name="alphabet-sort"
          value="alphabet-sort-reverse"
        />
        <label for="alphabet-sort-reverse">
          <span class="icon icon--arrow-up" @click="sortAlphaReverse"></span>
        </label>
      </div>
    </div>
    <div class="sort-form__group">
      <div class="sort-form__input-wrapper input-wrapper--search">
        <input
          type="search"
          v-model="seachCityName"
          @focus="inputFocused = true"
          @blur="inputFocused = false"
          :placeholder="inputFocused ? '' : 'Название города'"
        />
      </div>
    </div>
    <div class="sort-form__group">
      <div
        v-for="condition in weatherConditions"
        :key="condition.value"
        class="sort-form__input-wrapper input-wrapper--checkbox"
      >
        <input type="checkbox" :id="condition.value" />
        <label :for="condition.value">
          <span
            @click="updateFilters(condition.value)"
            :class="['icon', `icon--${condition['value']}`]"
          />
        </label>
      </div>
    </div>
  </section>
</template>

<script>
import helper from "@/mixins/helper";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "Header",
  mixins: [helper],
  data() {
    return {
      seachCityName: "",
      inputFocused: false,
    };
  },
  watch: {
    seachCityName: function () {
      this.setCities(
        this.fullListofCities.filter((city) =>
          city.city.toLowerCase().includes(this.seachCityName.toLowerCase())
        )
      );
    },
  },
  computed: {
    ...mapGetters(["cities", "fullListofCities", "filters"]),
  },
  methods: {
    ...mapMutations({
      setCities: "SET_CITIES",
      setSortDirect: "SET_SORT_DIRECTION",
      setFilters: "SET_FILTERS",
    }),
    sortAlpha() {
      this.setSortDirect("alpha");
      this.setCities(this.alphaCitySort(this.cities));
    },
    sortAlphaReverse() {
      this.setSortDirect("alphaReverse");
      this.setCities(this.alphaReverseCitySort(this.cities));
    },
    updateFilters(value) {
      this.filters.includes(value)
        ? this.setFilters(this.filters.filter((item) => item !== value))
        : this.setFilters(this.filters.push(value));
    },
  },
};
</script>

<style lang="scss" scoped>
.sort-form {
  display: flex;
  min-width: 712px;
  padding: 12px 20px;
  background-color: var(--color-blue-main);

  &__group {
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    flex-shrink: 0;
    margin-right: 20px;
    margin-bottom: -2px;

    & > div {
      margin-right: 2px;
      margin-bottom: 2px;
    }
  }

  .input-wrapper {
    display: flex;
    &--search {
      input {
        width: 254px;
        padding: 8px 20px;
        color: var(--color-text-input);
        background-color: var(--color-input-base);
        border: none;
        outline: none;
        transition: background-color var(--transition-base);
        &:hover {
          background-color: var(--color-input-hover);
        }
        &:focus {
          background-color: var(--color-input-focus);
        }
        &::placeholder {
          color: var(--color-text-placeholder);
          transition: opacity var(--transition-base);
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
