<template>
  <div class="notFoundPage">
    <div class="text"><b>404 |</b> страница не найдена</div>
    <a class="button" @click="$router.push({ name: 'main' })"
      >Вернуться на главную страницу</a
    >
  </div>
</template>

<style lang="scss" scoped>
.notFoundPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20%;

  .text {
    font-size: 35px;
    width: 350px;
    padding: 10px;
  }

  .button {
    display: inline-block;
    background-color: var(--color-label-base);
    color: white;
    border: 1px solid #777;
    padding: 7px 8px 7px 32px;
    width: 266px;
    margin-top: 10px;
    border-radius: 7px;

    &:before {
      content: "\261C";
      float: left;
      font-size: 30px;
      margin: 0 10px 0 -27px;
      box-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), 2px 0 0 white;
    }

    &:hover {
      background-color: var(--color-label-hover);
      box-shadow: 0 4px 10px rgba(11, 23, 78, 0.5);
      cursor: pointer;
    }
  }
}
</style>
