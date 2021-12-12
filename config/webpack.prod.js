const path = require('path');
const rootPath = '../'
const webpackBaseConfig = require('./webpack.config')
const clean = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Object.assign(webpackBaseConfig, {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, rootPath, 'src/main.js'),
  },
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'js/[name].[hash:8].js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, rootPath, 'dist'),
  },
  plugins: [
    new clean.CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      title: 'test'
    })
  ]
});