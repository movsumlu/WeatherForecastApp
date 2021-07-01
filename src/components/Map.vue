<template>
  <div class="weather-app__map weather-map">
    <span class="pin pin--temporarily"></span>
  </div>
</template>

<script>
export default {
  name: "Map",
};
</script>

<style lang="scss" scoped>
.weather-map {
  background-image: url("../assets/img/map.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
}

.pin {
  display: block;
  width: 16px;
  height: 16px;

  background-color: var(--color-white);
  border: 4px solid var(--color-blue-main);
  border-radius: 50%;
  cursor: pointer;

  transition: background-color var(--transition-base),
    border var(--transition-base), box-shadow var(--transition-base);
}

.pin:hover {
  background-color: var(--color-blue-light);
}

.pin:active {
  background-color: var(--color-blue-main);
  border: 4px solid var(--color-white);
  box-shadow: 0 0 0 4px var(--color-blue-main), 0 8px 20px rgba(11, 23, 78, 0.5);
}

.pin--temporarily {
  position: relative;
  top: 50%;
  left: 50%;
}
</style>
