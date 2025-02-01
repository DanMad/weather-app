const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
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
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: './public/assets', to: 'assets' },
        { from: './public/404.html', to: '404.html' },
      ],
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './public/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
};
