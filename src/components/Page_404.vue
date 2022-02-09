<template>
  <div class="page_404">
    <div class="text"><b>404 |</b> страница не найдена</div>
    <a class="button" @click="$router.push({ name: 'container' })"
      >Вернуться на главную страницу</a
    >
  </div>
</template>

<style lang="scss" scoped>
.page_404 {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .text {
    font-size: 35px;
    padding: 10px;
  }

  .button {
    display: inline-block;
    background-color: var(--color-label-base);
    color: var(--color-text-white);
    padding: 7px 8px 0 32px;
    border-radius: 4px;

    &:before {
      content: "\261C";
      float: left;
      font-size: 30px;
      margin: -6px 10px 0 -25px;
      box-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), 2px 0 0 var(--color-text-white);
    }

    &:hover {
      background-color: var(--color-label-hover);
      box-shadow: 0 4px 10px rgba(11, 23, 78, 0.5);
      cursor: pointer;
    }
  }
}
</style>
