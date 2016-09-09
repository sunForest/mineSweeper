const webpack = require('webpack');
const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');


const BUILD_DIR = path.resolve(__dirname + '/build');
const APP_DIR = path.resolve(__dirname + '/app');

var config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: '/'
    },
    devtool: 'source-map',
    devServer: {
        inline: true,
        contentBase: BUILD_DIR,
        port: 3000
    },
    postcss: function () {
        return [precss, autoprefixer]
    },
    module: {
        loaders: [
            {
                test: /\.jsx/,
                include: APP_DIR,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test:   /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            }

        ]
    }
};

module.exports = config;