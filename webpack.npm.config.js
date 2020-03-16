const path = require('path')

module.exports = {
  entry: './src/npm-entry.js',
  output: {
    filename: 'shadow-tracker-npm.js',
    path: path.resolve(__dirname, 'shadow-tracker'),
    libraryTarget: 'commonjs2'
  },
  module:{
    rules:[
      {
        test:/(\.js)$/,
        loader: 'babel-loader',
        exclude:path.resolve(__dirname,'node_modules')
      }
    ]
  }
}