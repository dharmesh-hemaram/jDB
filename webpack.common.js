const path = require('path');
var packageJson = require('./package.json');
module.exports = {
    entry: {
        DB: './src/db.js',
        Utils: './src/util/utils.js'
    },
    output: {
        filename: 'j[name].js'.toLowerCase(),
        path: path.resolve(__dirname, 'dist'),
        libraryExport: "default",
        library: "[name]",
        libraryTarget: "umd",
    }, module: {
        rules: [{
            test: /\.js$/,
            loader: "babel-loader",
            options: {
                presets: ["es2015"]
            }
        }]
    }
}