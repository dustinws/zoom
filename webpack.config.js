const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, 'build', 'browser'),
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
        use: ['eslint-loader'],
      },
    ],
  },
};
