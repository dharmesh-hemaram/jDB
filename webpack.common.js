const path = require('path');

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: '[name].js'.toLowerCase(),
        path: path.resolve(__dirname, 'dist'),
        libraryExport: "default",
        libraryTarget: "umd",
    }, module: {
        rules: [{
            test: /\.js$/,
            loader: "babel-loader",
            options: {
                presets: ["env"]
            }
        }]
    }
}