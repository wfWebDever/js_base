
LCP

- 优先使用服务端渲染 SSR
exp: Next.js

- 资源打包后推到CDN，资源加缓存,开启Gzip压缩资源

- 服务端渲染的html体积尽量减少
  nextjs会把服务端数据放到html 一个标签中 所以修剪数据大小

- CSS打包缩小体积，关键的打包到header 内联标签中  非关键的延迟加载(使用loadcss)
  减少CSS文件数量 写到一个文件中 或者都import进到global.css中
  
- 字体预加载 而且加上 display: 'swap'
  如果字体文件比较多 比如 4 5个的话 最佳的策略是把字体写到CSS中 @font-face 然后把字体文件进行base64转化 这样就减少了字体文件的请求数量
  这里需要有个平衡 如果要求字体文件预加载 就会影响页面的打开速度 如果要求打开速度 那么字体文件就必须减少数量 写到一个CSS中
  
- JS关键的预加载(<link rel="preload">)和非关键的延迟加载和按需加载
  JS打包的数量控制，最好是8个以内 因为请求数量多了 加载时间肯定慢 所以webpack打包中的config.optimization.splitChunks.minSize = 20000 需要权衡这个配置
  组件按需打包 组件除了SEO的懒加载 但是会影响INP指标 
  延迟加载: 使用React.lazy或者nextjs Dynamic

- 图片改成webP,减少图片大小，重要的预加载, 屏幕外的延迟加载,
预加载使用<link rel="preload">, 懒加载使用库或者使用浏览器自带的 ```IntersectionObserver```
根据用户的网络情况自适应加载不同质量的图片资源 比如4G网络以下加载质量低一级的图片


以上参照文章https://web.dev/optimize-lcp/
