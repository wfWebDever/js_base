
LCP

- 优先使用服务端渲染 SSR
exp: Next.js

- 资源打包后推到CDN，资源加缓存,开启Gzip压缩资源

- CSS打包缩小体积，关键的打包到header 内联标签中  非关键的延迟加载(使用loadcss)

- JS关键的预加载(<link rel="preload">)和非关键的延迟加载和按需加载
组件按需打包 组件除了SEO的懒加载
延迟加载: 使用React.lazy或者nextjs Dynamic

- 字体预加载 而且加上 display: 'swap' 

- 图片改成webP,减少图片大小，重要的预加载, 屏幕外的延迟加载,
预加载使用<link rel="preload">, 懒加载使用库或者使用浏览器自带的 ```IntersectionObserver```
根据用户的网络情况自适应加载不同质量的图片资源 比如4G网络以下加载质量低一级的图片


以上参照文章https://web.dev/optimize-lcp/
