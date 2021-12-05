const path = require('path');
const rootPath = '../'

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, rootPath, 'src/main.js'),
  },
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: '[name].[hash:8].js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, rootPath, 'dist'),
  }
};