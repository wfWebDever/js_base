# 抽取模块打包 splitChunks

```
optimization{
  splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
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