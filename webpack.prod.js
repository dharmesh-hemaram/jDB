const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const packageJson = require('./package.json');
module.exports = merge(common, {
  output: {
    filename: '[name].min.js'.toLowerCase()
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }),
    new webpack.BannerPlugin(` ${packageJson.name.toUpperCase()} v-${packageJson.version} \n Author: ${packageJson.author} \n License: ${packageJson.license} \n Homepage: ${packageJson.homepage}`)
  ],
  mode: 'production'
});