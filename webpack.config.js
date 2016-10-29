var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var env = process.env.MIX_ENV || 'dev';
var isProduction = (env === 'prod');

var plugins = [new ExtractTextPlugin('css/app.css')];

// This is necessary to get the sass @import's working
var stylePathResolves = (
  'includePaths[]=' + path.resolve('./') + '&' +
  'includePaths[]=' + path.resolve('./node_modules')
);

if (isProduction) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
}

module.exports = {
  entry: [
    './web/static/js/index.js',
    './web/static/css/base.sass'
  ],
  output: {
    path: './priv/static',
    filename: 'js/app.js'
  },
  resolve: {
    modulesDirectories: [
      "node_modules",
      __dirname + "/web/static/js"
    ]
  },
  module: {
    loaders: [
        {
          test: /\.js?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'react']
          }
        },
        {
          test: /\.sass$/,
          loader: ExtractTextPlugin.extract(
            'style',
            'css' + '!sass?outputStyle=expanded&' + stylePathResolves
          )
        }
    ]
  },
  plugins: plugins
};
