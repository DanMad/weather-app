const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { version } = require('./package.json');

module.exports = {
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 3000,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
  devtool: 'inline-source-map',
  entry: './src/index.jsx',
  mode: 'development',
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
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/assets',
          to: path.join(__dirname, 'dist/assets'),
        },
      ],
    }),
    new DotenvWebpack({
      path: './.env.development',
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
        isDevelopment: true,
        isIndexed: true,
        referrer: 'unsafe-url',
        title: 'The Weather',
        url: 'https://weather.danielmaddison.io',
        version,
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: ['./src', 'node_modules'],
  },
};
