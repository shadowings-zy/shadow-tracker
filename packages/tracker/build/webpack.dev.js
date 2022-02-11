const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.ts'),
  mode: 'development',
  output: {
    filename: 'shadow-tracker-test.js',
    path: path.resolve(__dirname, '../test')
  },
  module: {
    rules: [
      {
        test: /(\.ts)$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: path.resolve(__dirname, 'node_modules')
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    port: 10010,
    static: {
      directory: path.join(__dirname, '../test'),
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },
};
