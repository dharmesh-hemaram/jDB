const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const path = require('path');
const packageJson = require('./package.json');
module.exports = merge(common, {
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.BannerPlugin(' jDB v' + packageJson.version + ' \n Author:' + packageJson.author + ' \n License:' + packageJson.license + " \n Homepage:" + packageJson.homepage)
  ]
});