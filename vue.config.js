const path = require("path");
const webpack = require("webpack");

const resolve = function (pathString) {
  return path.resolve(__dirname, pathString);
};

const plugins = [
  new webpack.ProvidePlugin({
    mapGetters: ["vuex", "mapGetters"],
    mapMutations: ["vuex", "mapMutations"],
    mapActions: ["vuex", "mapActions"],
    mapState: ["vuex", "mapState"],
  }),
];

module.exports = {
  publicPath: "/WeatherForecastApp/",
  configureWebpack: {
    plugins,
    resolve: {
      alias: {
        src: resolve("src/"),
      },
    },
  },
};
