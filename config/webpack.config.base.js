var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var outputFile = 'vue-drag-drop';

var config = require('../package.json');

module.exports = {
  entry: ['./src/polyfills.js', './src/index.js'],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          optimizeSSR: false,
          loaders: {
            css: ExtractTextPlugin.extract('css-loader'),
            sass: ExtractTextPlugin.extract('css-loader!sass-loader'),
            scss: ExtractTextPlugin.extract('css-loader!sass-loader'),
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'VERSION': JSON.stringify(config.version),
    }),
    // new ExtractTextPlugin(outputFile + '.css'),
  ],
};
