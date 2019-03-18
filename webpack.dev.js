const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const packageJson = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  output: {
    publicPath: '/'
  },
  optimization: {
    usedExports: true
  },
  devServer: {
    contentBase: [path.join(__dirname, 'dist'),path.join(__dirname, 'assets'),path.join(__dirname, 'playground')],
    compress: true,
    port: 9000
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
  plugins: []
});