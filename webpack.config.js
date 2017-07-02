const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './index.js',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'zoom.min.js',
    library: 'Zoom',
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({ mangle: true }),
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
};
