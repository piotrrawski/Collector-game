//Konfiguracja Webpack

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: "./js/app.js",
    output: {
        filename: "./js/out.js"
    },

    watch: true,
    devtool: 'source-map',

    module: {
        loaders: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-2', 'react']
            }
        }]
    },

    // plugins: [
    //     new UglifyJsPlugin({
    //         sourceMap: true,
    //         exclude: /node_modules/
    //     })
    // ]
};