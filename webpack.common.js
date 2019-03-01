const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  entry: {
    jdb: './src/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist/*'])
  ],
  output: {
    filename: '[name].js'.toLowerCase(),
    path: path.resolve(__dirname, 'dist'),
    libraryExport: "default",
    libraryTarget: "umd",
  }
}