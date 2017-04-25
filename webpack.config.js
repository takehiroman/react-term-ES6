const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry : __dirname + '/src/index.js',
    output: {
        path:__dirname + '/dist',
        filename:'bundle.js'
    },

    devServer: {
        contentBase: 'public',
        port: 3000
    },

    module: {
        rules:[
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query:{
                    presets:['es2015','react']
                }
            }
        ]
    },
};