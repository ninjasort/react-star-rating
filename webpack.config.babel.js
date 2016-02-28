import path from 'path';
import webpack from 'webpack';

export default {
  entry: [
    path.resolve(__dirname, './src/StarRating.js')
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, exclude: /node_modules/, loader: 'style!css' }
    ]
  },
  resolve: {
    root: [
      path.resolve(__dirname, 'src')
    ],
    extensions: ['', '.js', '.css']
  }
}