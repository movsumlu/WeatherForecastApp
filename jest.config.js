module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript",
  transform: {
    "^.+\\.vue$": "vue-jest",
  },
  testMatch: ["**/src/tests/*.spec.(js|ts)"],
};
