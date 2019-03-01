const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const packageJson = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  optimization: {
    usedExports: true
  },
  devServer: {
    contentBase: ['./dist', './assets']
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.(json)$/,
      use: [
        'file-loader'
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: packageJson.name
    })
  ]
});