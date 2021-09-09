<template>
  <section class="header">
    <div class="header__group">
      <div
        class="header__input-wrapper input-wrapper--radio"
        @click="sortAlpha"
      >
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
      <div
        class="header__input-wrapper input-wrapper--radio"
        @click="sortalphaRev"
      >
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
      <div class="header__input-wrapper input-wrapper--search">
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
        class="header__input-wrapper input-wrapper--checkbox"
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
import { defineComponent } from "vue";
import { mapMutations, mapGetters } from "vuex";
import helper from "@/mixins/helper";
import ObjectOfCity from "@/models/Models";

export default defineComponent({
  name: "Header",
  mixins: [helper],
  data: () => ({
    seachCityName: "",
    inputFocused: false,
  }),
  watch: {
    seachCityName() {
      this.setCities(
        this.fullListofCities.filter((city: ObjectOfCity) =>
          city.city.toLowerCase().includes(this.seachCityName.toLowerCase())
        )
      );
    },
  },
  computed: {
    ...mapGetters(["cities", "fullListofCities", "filters"]),
    placeholderText(): string {
      return this.inputFocused ? "" : "Название города";
    },
  },
  methods: {
    ...mapMutations({
      setCities: "SET_CITIES",
      setSortDirect: "SET_SORT_DIRECTION",
      setFilters: "SET_FILTERS",
    }),
    sortAlpha(): void {
      this.setSortDirect("alpha");
      this.setCities(this.alphaCitySort(this.cities));
    },
    sortalphaRev(): void {
      this.setSortDirect("alphaRev");
      this.setCities(this.alphaRevCitySort(this.cities));
    },
    updateFilters(value: string): void {
      this.setFilters(
        this.filters.includes(value)
          ? this.filters.filter(function (filter: string) {
              return filter !== value;
            })
          : [...this.filters, value]
      );
    },
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
      margin-right: 2px;
      margin-bottom: 2px;
    }
  }

  .input-wrapper {
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
