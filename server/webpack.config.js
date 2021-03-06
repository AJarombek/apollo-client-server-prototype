/**
 * Setup Webpack for bundling TypeScript files on the server.
 * @author Andrew Jarombek
 * @since 5/16/2020
 */

const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    app: path.join(__dirname, './src/index.ts')
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  mode: 'development',
  externals: [
    nodeExternals()
  ],
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].js',
    publicPath: '',
    libraryTarget: 'commonjs'
  }
};
