const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    xdb: './src/db.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: "babel-loader",
      // the loader which should be applied, it'll be resolved relative to the context
      // -loader suffix is no longer optional in webpack2 for clarity reasons
      // see webpack 1 upgrade guide
      options: {
        presets: ["es2015"]
      },
      // options for the loader
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'xDB'
    })
  ]
}