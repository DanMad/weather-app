const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { version } = require('./package.json');

module.exports = {
  entry: './src/index.jsx',
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                },
              ],
            ],
          },
        },
      },
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
    path: path.join(__dirname, 'dist'),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/assets',
          to: path.join(__dirname, 'dist/assets'),
        },
        { from: 'public/CNAME', to: path.join(__dirname, 'dist') },
      ],
    }),
    new DotenvWebpack({
      path: './.env.production',
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './public/index.html',
      templateParameters: {
        description:
          'A weather app that displays the forecast, current conditions, and UV Index to help you stay sun-safe.',
        image: {
          alt: 'An exhibit of a weather app displaying the forecast, current conditions, and UV Index.',
          src: '/assets/thumbnail.svg',
        },
        isDevelopment: false,
        isIndexed: true,
        referrer: 'strict-origin-when-cross-origin',
        title: 'The Weather',
        url: 'https://weather.danielmaddison.io',
        version,
      },
    }),
    new HtmlWebpackPlugin({
      filename: '404.html',
      inject: 'body',
      template: './public/index.html',
      templateParameters: {
        description:
          'A weather app that displays the forecast, current conditions, and UV Index to help you stay sun-safe.',
        image: {
          alt: 'An exhibit of a weather app displaying the forecast, current conditions, and UV Index.',
          src: '/assets/thumbnail.svg',
        },
        isDevelopment: false,
        isIndexed: false,
        referrer: 'strict-origin-when-cross-origin',
        title: 'Page not found',
        url: 'https://weather.danielmaddison.io',
        version,
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: ['./src', 'node_modules'],
  },
};
