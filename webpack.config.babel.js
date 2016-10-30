import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const env = process.env.MIX_ENV || 'dev';
const isProduction = (env === 'prod');

let plugins = [
  new ExtractTextPlugin('css/app.css'),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  })
];

// This is necessary to get the sass @import's working
const stylePathResolves = (
  'includePaths[]=' + path.resolve('./') + '&' +
  'includePaths[]=' + path.resolve('./node_modules')
);

if (isProduction) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
}

export default {
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
      'node_modules',
      __dirname + '/web/static/js'
    ],
    root: [
      path.join(__dirname, 'priv/static/js'),
      path.join(__dirname, 'priv/static/css'),
    ],
    alias: {
      phoenix: `${__dirname}/web/static/js/phoenix.js`,
      phoenix_html: `${__dirname}/deps/phoenix_html/web/static/js/phoenix_html.js`
    }
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
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style','css')
        }
    ]
  },
  plugins: plugins
};
