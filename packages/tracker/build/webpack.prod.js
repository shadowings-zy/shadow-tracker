const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.ts'),
  mode: 'production',
  output: {
    filename: process.env.TARGET === 'cjs' ? 'shadow-tracker.cjs.js' : 'shadow-tracker.esm.js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: process.env.TARGET === 'cjs' ? 'commonjs2' : undefined
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
};
