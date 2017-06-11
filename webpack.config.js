var path = require("path");
var webpack = require("webpack");
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

var config;

config = {
    context: __dirname + '',
    entry: {
        vendor: [
            'angular',
        ],
        app: './app/entry.js'
    },
    output: {
        path: __dirname + '/app/dist/bundle/',
        filename: '[name].min.js'

    },
    module: {
        loaders: [
            {test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/}
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: false,
            sourceMap: true,
            // mangle: true,
            mangle: false
        })
    ],
    devtool: "source-map"

};

module.exports = function(env) {
    if(env.dev){
        config.plugins = [new ProgressBarPlugin()];
    }
    return config;
};