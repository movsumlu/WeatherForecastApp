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
