const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/packages/index.js',

  output: {
    path: path.join(__dirname, 'dist', 'browser'),
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
