const webpack = require('webpack')
const path = require('path')
const packageJson = require('./package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let config = {
  mode: 'production',
  entry: {
    db: './src/index.js'
  },
  output: {
    filename: '[name].min.js'.toLowerCase(),
    path: path.resolve(__dirname, 'dist'),
    libraryExport: 'default',
    libraryTarget: 'umd',
    clean: true
  },
  plugins: []
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map'
    config.output = {
      publicPath: '/'
    }
    config.optimization = {
      usedExports: true
    }
    config.devServer = {
      contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'assets'), path.join(__dirname, 'playground')],
      compress: true,
      port: 9000
    }
    config.module = {
      rules: [
        {
          test: /\.(json)$/,
          use: ['file-loader']
        }
      ]
    }
    config.plugins.push(new HtmlWebpackPlugin({ title: 'Development' }))
  }

  if (argv.mode === 'production') {
    config.plugins.push(new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }))
    config.plugins.push(
      new webpack.BannerPlugin(` ${packageJson.name.toUpperCase()} v-${packageJson.version} \n Author: ${packageJson.author} \n License: ${packageJson.license} \n Homepage: ${packageJson.homepage}`)
    )
  }

  return config
}
