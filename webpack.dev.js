const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
      contentBase: [path.join(__dirname, "dist"), path.join(__dirname, "assets")],
      compress: true,
      port: 9000
    }
});