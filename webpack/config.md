# 先用工具webpack-bundle-analyzer分析已有的包大小和包含的模块

```
"devDependencies": {
        "cross-env": "^7.0.3",
        "webpack-bundle-analyzer": "^4.5.0"
}
```

```
"scripts": {
           
       "build:view": "cross-env GENERATE_SOURCEMAP=false ANALYZER=true react-app-rewired build"
},
```
配置文件
```
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// ANALYZER环境下开启分析
if (process.env.ANALYZER) {
        config.plugins.push(new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            generateStatsFile: true, // 是否生成stats.json文件
            reportFilename: 'report.html',
        }));
    }
```

# 抽取模块打包 splitChunks

```
optimization{
  splitChunks: {
      chunks: "async", // 只抽取异步加载的模块，比如import()
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5, //最多异步加载的JS数量
      maxInitialRequests: 3, // 最多初始化加载的JS数量
      automaticNameDelimiter: '~', // 分隔符
      name: true, 
      cacheGroups: {
          vendors: {
              test: /[\\/]node_modules[\\/]/, // 会把node_modules下的 公共代码抽取出来 name: vendors
              priority: -10  //优先级比default高 但是是负的
          },
          default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
          }
      }
  }
}
```
