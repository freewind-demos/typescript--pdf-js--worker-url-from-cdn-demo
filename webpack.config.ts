import {Configuration} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const config: Configuration = {
  mode: "development",
  entry: './entry.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        {loader: 'style-loader'},
        {loader: 'css-loader'}
      ]
    }, {
      test: /\.ts$/,
      loader: 'ts-loader'
    }, {
      test: /\.js$/,
      use: [{
        loader: 'babel-loader', options: {
          presets: ['@babel/preset-env']
        }
      }]
    }, {
      test: /\.(gif|png|jpe?g|svg)$/i,
      loader: 'url-loader',
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}

export default config;
