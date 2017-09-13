const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const path = require('path');
var packageJson = require('./package.json');

module.exports = merge(common, {
    output: {
        filename: 'x.[name]-' + packageJson.version + '.min.js'.toLowerCase(),
        path: path.resolve(__dirname, 'dist'),
        libraryExport: "default",
        library: "[name]",
        libraryTarget: "umd",
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
});