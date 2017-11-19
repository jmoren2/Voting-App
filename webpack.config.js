var path = require('path');
var webpack = require('webpack');
var htmlWebpack = require('html-webpack-plugin');


module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, 'client/Router.jsx')
    ],
    output: {
        path: path.join(__dirname + '/dist/'),
        file: 'index.js',
        publicPath: '/'
    },
    plugins: [
        new htmlWebpack ({
            template: 'client/index.tpl.html',
            inject: 'body',
            filename: 'index.html',
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loader: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    'presets': ['react', 'es2015']
                }
            }
        ]
    }
};