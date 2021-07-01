<template>
  <section class="sort-form weather-content__sort">
    <form action="#" method="GET">
      <div class="sort-form__group">
        <div
          class="sort-form__input-wrapper input-wrapper input-wrapper--radio"
        >
          <input
            id="alphabet-sort"
            type="radio"
            name="alphabet-sort"
            value="alphabet-sort"
            checked
          />
          <label for="alphabet-sort" aria-label="Сортировка по алфавиту">
            <span class="icon icon--arrow-down"></span>
          </label>
        </div>
        <div
          class="sort-form__input-wrapper input-wrapper input-wrapper--radio"
        >
          <input
            id="alphabet-sort-reverse"
            type="radio"
            name="alphabet-sort"
            value="alphabet-sort-reverse"
          />
          <label
            for="alphabet-sort-reverse"
            aria-label="Сортировка по алфавиту в обратном направлении"
          >
            <span class="icon icon--arrow-up"></span>
          </label>
        </div>
      </div>
      <div class="sort-form__group">
        <div
          class="sort-form__input-wrapper input-wrapper input-wrapper--search"
        >
          <input
            id="search"
            type="search"
            name="city-search"
            placeholder="Название города"
          />
          <label for="search" aria-label="Поиск городов"></label>
        </div>
      </div>
      <div class="sort-form__group">
        <div
          class="sort-form__input-wrapper input-wrapper input-wrapper--checkbox"
        >
          <input
            id="rainy"
            name="weather-conditions"
            type="checkbox"
            value="rainy"
          />
          <label aria-label="Дождливо" for="rainy">
            <span class="icon icon--rainy"></span>
          </label>
        </div>
        <div
          class="sort-form__input-wrapper input-wrapper input-wrapper--checkbox"
        >
          <input
            id="sunny"
            name="weather-conditions"
            type="checkbox"
            value="sunny"
          />
          <label aria-label="Солнечно" for="sunny">
            <span class="icon icon--sunny"></span>
          </label>
        </div>
        <div
          class="sort-form__input-wrapper input-wrapper input-wrapper--checkbox"
        >
          <input
            id="cloudy"
            name="weather-conditions"
            type="checkbox"
            value="cloudy"
          />
          <label aria-label="Облачно" for="cloudy">
            <span class="icon icon--cloudy"></span>
          </label>
        </div>
        <div
          class="sort-form__input-wrapper input-wrapper input-wrapper--checkbox"
        >
          <input
            id="snowy"
            name="weather-conditions"
            type="checkbox"
            value="snowy"
          />
          <label aria-label="Снежно" for="snowy">
            <span class="icon icon--snowy"></span>
          </label>
        </div>
        <div
          class="sort-form__input-wrapper input-wrapper input-wrapper--checkbox"
        >
          <input
            id="stormy"
            name="weather-conditions"
            type="checkbox"
            value="stormy"
          />
          <label aria-label="Торнадо" for="stormy">
            <span class="icon icon--stormy"></span>
          </label>
        </div>
        <div
          class="sort-form__input-wrapper input-wrapper input-wrapper--checkbox"
        >
          <input
            id="blizzard"
            name="weather-conditions"
            type="checkbox"
            value="blizzard"
          />
          <label aria-label="Гроза" for="blizzard">
            <span class="icon icon--blizzard"></span>
          </label>
        </div>
        <div
          class="sort-form__input-wrapper input-wrapper input-wrapper--checkbox"
        >
          <input
            id="metorite"
            name="weather-conditions"
            type="checkbox"
            value="metorite"
          />
          <label aria-label="Метеоритный дождь" for="metorite">
            <span class="icon icon--metorite"></span>
          </label>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss" scoped>
.sort-form {
  display: flex;

  form {
    display: flex;
    min-width: 712px;
    padding: 12px 20px;
    background-color: var(--color-blue-main);
  }

  &__group {
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    flex-shrink: 0;
    margin-right: 20px;
    margin-bottom: -2px;
  }
}

.sort-form__group > div {
  margin-right: 2px;
  margin-bottom: 2px;
}

.sort-form__group:last-child,
.sort-form__group > div:last-child {
  margin-right: 0;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;

  &--strips-big {
    width: 6px;
    height: 22px;
    background-image: url("../assets/img/icons/icon-strips-big.svg");
  }

  &--strips-small {
    width: 6px;
    height: 16px;
    background-image: url("../assets/img/icons/icon-strips-small.svg");
  }

  &--arrow-down {
    background-image: url("../assets/img/icons/icon-arrow-down.svg");
  }

  &--arrow-up {
    background-image: url("../assets/img/icons/icon-arrow-up.svg");
  }

  &--rainy {
    background-image: url("../assets/img/icons/icon-rainy.svg");
  }

  &--sunny {
    background-image: url("../assets/img/icons/icon-sunny.svg");
  }

  &--cloudy {
    background-image: url("../assets/img/icons/icon-cloudy.svg");
  }

  &--snowy {
    background-image: url("../assets/img/icons/icon-snowy.svg");
  }

  &--stormy {
    background-image: url("../assets/img/icons/icon-stormy.svg");
  }

  &--blizzard {
    background-image: url("../assets/img/icons/icon-blizzard.svg");
  }

  &--metorite {
    background-image: url("../assets/img/icons/icon-metorite.svg");
  }

  &--wind {
    background-image: url("../assets/img/icons/icon-wind.svg");
  }
}

.input-wrapper {
  display: flex;

  input {
    border-radius: 2px;
  }

  &--search input {
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

  &--search {
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
