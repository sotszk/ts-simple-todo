const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outputDir = path.join(__dirname, 'dist');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index.tsx'),
  output: {
    path: outputDir,
    filename: 'index.js',
    publicPath: '/',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
    descriptionFiles: ['package.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: path.join(__dirname, 'index.html'),
      inject: 'body',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      minimize: false,
    }),
  ],
  devServer: {
    host: '0.0.0.0',
    hot: true,
    port: 8080,
    inline: true,
    disableHostCheck: true,
    historyApiFallback: true,
    contentBase: outputDir,
  },
};