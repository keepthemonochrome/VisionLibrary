var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: "./client/src/index.js",
  output: {
    path: path.join(__dirname, 'client/public'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015', 'react'],
        },
      }
    ]
  },
  plugins: [
      new webpack.NoErrorsPlugin()
  ],

  // resolve: {
  //   extensions: ['', '.js', '.jsx', '.css'],
  // },
  // Create Sourcemaps for the bundle
  devtool: 'source-map'
}
