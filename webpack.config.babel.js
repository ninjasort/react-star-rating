var path = require('path');
var webpack = require('webpack');

module.exports = function (options) {
  return {
    entry: {
      'react-star-rating': './src/StarRating',
      'docs': './src/docs'
    },
    debug: true,
    output: {
      filename: '[name].js',
      path: __dirname + '/dist',
      publicPath: '/'
    },
    module: {
      loaders: [
        { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
        { test: /\.css$/, exclude: /node_modules/, loader: 'style!css' },
        { test: /\.json$/, exclude: /node_modules/, loader: 'json' },
        { test: /\.scss$/, exclude: /node_modules/, loader: 'style!css!sass' }
      ]
    },
    resolve: {
      root: [path.resolve(__dirname)],
      extensions: ['', '.js', '.json', 'css'],
      modules: [
        path.resolve('./src'),
        'node_modules'
      ],
      alias: {
        package: path.resolve(__dirname, './package.json')
      }
    },
    plugins: []
  }
};