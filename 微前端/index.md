# 关于微前端
在前东家的时候，参与过微前端的实践，那时候[乾坤](http://baidu.com)还没出。
# 核心需要解决的
## JS沙箱
快照思路，即通过应用的初始（bootstrap）、加载（mounted）分别打快照，保存全局变量和劫持全局事件，
这样当应用被切换或者卸载的时候，恢复至初始状态，当应用第二次加载的时候恢复到加载（mounted）状态。比如

```js
// before bootstrap
const proxy = window
const modifyProp = Object.create(null)
// 

```
## 样式隔离
1、通过html entry
以打包后的项目的index.html为入口，切换时重新加载css资源，因为切换到新的页面后，会卸载包括css等，所以有了天然的样式隔离。
2、通过shand dom方式
缺点是内部是隔离了，但是如果需要调用全局弹窗，不容易实现。
 