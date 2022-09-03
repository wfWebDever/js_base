# 谷歌地图
## 组件对比：
- google 原生JS
- google-map-react：最新版本引入后在react18下报错 有提问者直接推荐其他组件
- react-google-maps (https://tomchentw.github.io/react-google-maps/#installation) 对 react 16.8之前版本支持的最好,但是对于react18 不太兼容 
报一些waring 但是没有大的错误.
- @react-google-maps/api (https://react-google-maps-api-docs.netlify.app) 支持最新版本 而且对于JS加载状态有支持 但是对于最新的react 18 引入后，
拖拽地图 标记会闪烁 官网还没修复.

# 视频组件 

react-player (https://github.com/cookpete/react-player)
## nextjs 使用方式

```
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

<ReactPlayer url=''>
```
