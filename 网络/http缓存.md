
# 什么时候发生http缓存
客户端向服务端第二次发起请求时

#分类
### 强缓存
故名思议就是直接走浏览器缓存，不与服务端发生交互。
当服务端返回的响应头包含
http1.1:catch-control: max-age = xxx(大于0)
http1.0: Expires、Program
第二次发起请求时就不会与服务器进行交互，浏览器返回200，直接取缓存数据，这就叫强制缓存，
### 协商缓存
与强缓存不同的是和服务端进行通信，通过服务端返回来确定是否取浏览器缓存资源。
当服务器返回的响应头中
包含catch-control: no-catch 或者 max-age = 0，或者无max-age, 或者max-age已经过期;
或者不包含catch-control;
或者```请求头```中catch-control: max-age = 0或者no-catch
并且响应头中有
http1.1:Etag字段（hash值)；
http1.0: Last-Modified；
那么再次发起请求时会再请求头中会带上if-not-match的字段值取Etag的值，if-modified-since的值取Last-modify的值请求到
服务端，服务端进行验证是否缓存生效，返回304取缓存 或者200更新资源。
### 私有缓存
只针对单个用户，一般指浏览器可以缓存，默认是私有缓存
catch-control: private
### 共享缓存
针对代理服务器、CDN等可以缓存资源的统称,比如js css 图片等
catch-control: public 
# 前端如何在日常中实践



