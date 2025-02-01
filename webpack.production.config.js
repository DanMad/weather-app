const path = require('path');
const CnameWebpackPlugin = require('cname-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');

module.exports = merge(commonConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  output: {
    clean: true,
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CnameWebpackPlugin({
      domain: 'weather.danielmaddison.io',
    }),
    new DotenvWebpack({
      path: './.env.production',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
});
