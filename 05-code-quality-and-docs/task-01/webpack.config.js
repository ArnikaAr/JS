const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const miniCSSWebpackPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'none',
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({template: './index.html'}),
        new miniCSSWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    miniCSSWebpackPlugin.loader,
                    'css-loader'
                ],
            },
        ],
    },
    devServer: {
        contentBase: './dist',
        port: 3000
    }
};