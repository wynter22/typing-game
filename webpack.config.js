const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  target: ['web', 'es5'],   // ie11 지원
  entry: './src/index.js',
  devServer: {
    hot: true,
    port: 8080,
    historyApiFallback: true,
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/i,
        include: path.join(__dirname),
        exclude: /(node_modules)|(public)/,
        use: {loader: 'babel-loader'}
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebPackPlugin({template: './src/index.html'}),
    new MiniCssExtractPlugin(),
  ],
};
