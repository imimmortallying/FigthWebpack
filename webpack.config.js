const path = require('path');
const mode = process.env.NODE_ENV || 'development';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    mode,
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    optimization: {
        minimizer: [
          new CssMinimizerPlugin(), '...'
        ],
      },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: [ MiniCssExtractPlugin.loader, "css-loader"],
          },
        ],
      },
    plugins: [
        new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html')
    }),
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
    })
],
}