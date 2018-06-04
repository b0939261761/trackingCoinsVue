module.exports = {
  productionSourceMap: false,

  devServer: {
    port: 4000
  },

  configureWebpack: {
    devtool: 'source-map'
  }
};
