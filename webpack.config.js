const path = require('path');

module.exports = {
  entry: {
    DB: './src/db.js',
    Utils: './src/util/utils.js'
  },
  output: {
    filename: 'x[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryExport: "default",
    library: "[name]",
    libraryTarget: "umd",
  },
  module: {
    /*rules: [{
      test: /\.js$/,
      loader: "babel-loader",
      // the loader which should be applied, it'll be resolved relative to the context
      // -loader suffix is no longer optional in webpack2 for clarity reasons
      // see webpack 1 upgrade guide
      options: {
        presets: ["es2015"]
      },
      // options for the loader
    }]*/
  },
  devtool: 'inline-source-map',
  plugins: [
  ],
  externals: {
    qunitjs: 'qunitjs'
  },
  devServer: {
    contentBase: [path.join(__dirname, "dist"), path.join(__dirname, "assets")],
    compress: true,
    port: 9000
  }
}