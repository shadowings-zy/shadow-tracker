const path = require('path')

module.exports = {
  entry: './src/script-entry.js',
  output: {
    filename: 'shadow-tracker-script.js',
    path: path.resolve(__dirname, 'shadow-tracker')
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