const path = require('path');
const DotenvWebpack = require('dotenv-webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');

module.exports = merge(commonConfig, {
  devServer: {
    compress: true,
    historyApiFallback: {
      rewrites: [{ from: /./, to: '404.html' }],
    },
    hot: true,
    open: true,
    port: 3000,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new DotenvWebpack({
      path: './.env.development',
    }),
  ],
});
