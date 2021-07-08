<template>
  <section class="sort-form">
    <div class="sort-form__group">
      <div class="sort-form__input-wrapper input-wrapper input-wrapper--radio">
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
      <div class="sort-form__input-wrapper input-wrapper input-wrapper--radio">
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
      <div class="sort-form__input-wrapper input-wrapper input-wrapper--search">
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
        class="sort-form__input-wrapper input-wrapper input-wrapper--checkbox"
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
import sortMethods from "@/mixins/helper";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "Header",
  mixins: [sortMethods],
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
  }

  &__group > div {
    margin-right: 2px;
    margin-bottom: 2px;
  }

  &__group:last-child,
  &__group > div:last-child {
    margin-right: 0;
  }
}

.input-wrapper {
  display: flex;

  input {
    border-radius: 2px;
  }

  &--search {
    input {
      width: 254px;
      padding: 8px 20px;
      color: var(--color-text-input);
      background-color: var(--color-input-base);
      border: none;
      outline: none;
      transition: background-color var(--transition-base);
      &hover {
        background-color: var(--color-input-hover);
      }
    }

    input:focus::placeholder,
    input:focus::-ms-input-placeholder {
      opacity: 0;
    }

    input:focus {
      background-color: var(--color-input-focus);
    }

    input::placeholder,
    input::-ms-input-placeholder {
      color: var(--color-text-placeholder);
      transition: opacity var(--transition-base);
    }
  }
}

.input-wrapper--radio label,
.input-wrapper--checkbox label {
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

.input-wrapper--radio label {
  justify-content: space-between;
  padding: 10px;
}

.input-wrapper--radio label:hover,
.input-wrapper--checkbox label:hover {
  background-color: var(--color-label-hover);
  box-shadow: 0 4px 10px rgba(11, 23, 78, 0.5);
}

.input-wrapper--radio label:active,
.input-wrapper--checkbox label:active {
  background-color: var(--color-label-active);
}

.input-wrapper--radio label > span,
.input-wrapper--checkbox label > span {
  transition: opacity var(--transition-base);
}

.input-wrapper--radio label:active > span,
.input-wrapper--checkbox label:active > span {
  opacity: 0.3;
}

.input-wrapper--radio input,
.input-wrapper--checkbox input {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  clip: rect(0 0 0 0);
}

.input-wrapper--radio input:focus + label,
.input-wrapper--checkbox input:focus + label {
  background-color: var(--color-label-hover);
}

.input-wrapper--radio input:disabled + label,
.input-wrapper--checkbox input:disabled + label {
  opacity: 0.5;
  pointer-events: none;
}

.input-wrapper--radio input:checked + label,
.input-wrapper--checkbox input:checked + label {
  background-color: var(--color-label-active);
  box-shadow: none;
}

.input-wrapper--radio input:checked:focus + label,
.input-wrapper--checkbox input:checked:focus + label,
.input-wrapper--radio input:checked + label:hover,
.input-wrapper--checkbox input:checked + label:hover {
  background-color: var(--color-label-hover-checked);
}
</style>
