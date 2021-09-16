const path = require("path");

const resolve = function (pathString) {
  return path.resolve(__dirname, pathString);
};

module.exports = {
  publicPath: "/WeatherForecastApp/",
  configureWebpack: {
    resolve: {
      alias: {
        src: resolve("src/"),
      },
    },
  },
};
