const path = require('path');
const rootPath = '../'
const webpackBaseConfig = require('./webpack.config')

module.exports = Object.assign(webpackBaseConfig, {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, rootPath, 'src/main.js'),
  }
});