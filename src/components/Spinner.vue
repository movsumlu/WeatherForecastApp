<template>
  <div class="loader">
    <svg height="100" width="100" viewBox="0 0 100 100">
      <circle class="loader--svg bg" cx="50" cy="50" r="45" />
      <circle class="loader--svg animate" cx="50" cy="50" r="45" />
    </svg>
    <p class="loader--text">Загрузка ...</p>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  margin: 70px 0 0 140px;

  &--svg {
    fill: none;
    stroke-width: 5px;
    stroke: rgb(64, 0, 148);

    &.bg {
      stroke: rgb(207, 205, 245);
    }

    &.animate {
      animation: fill-animation 1s cubic-bezier(1, 1, 1, 1) 0s infinite;
    }
  }

  &--text {
    margin-left: 20px;
  }
}

@keyframes fill-animation {
  0% {
    stroke-dasharray: 40 242.6;
  }
  50% {
    stroke-dasharray: 141.3;
  }
  100% {
    stroke-dasharray: 40 242.6;
    stroke-dashoffset: 282.6;
  }
}
</style>
