const path = require('path');
const mode = process.env.NODE_ENV || 'development';

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode,
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html')
    })
],
}