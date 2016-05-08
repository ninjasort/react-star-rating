import path from 'path';
import webpack from 'webpack';

export default {
  entry: {
    'react-star-rating': './src/StarRating',
    demo: './src/docs.jsx'
  },
  output: {
    filename: '[bundle].js',
    path: __dirname + '/dist',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, exclude: /node_modules/, loader: 'style!css' },
      { test: /\.json$/, exclude: /node_modules/, loader: 'json' }
    ]
  },
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  resolve: {
    alias: {
      package: path.resolve(__dirname, './package.json')
    },
    extensions: ['', '.js', '.css']
  }
}