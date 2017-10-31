const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/App.js',
  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  resolve: {
    modules: [__dirname, 'node_modules', 'src']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          query  :{
              presets:['react','es2015']
          }
        }
      }
    ]
  }
}
