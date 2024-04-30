

## 视频组件

- react-player (<https://github.com/cookpete/react-player>)

nextjs 使用方式

```
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

<ReactPlayer url=''>
```

## 全局加载进度

- NProgress （<https://github.com/rstacruz/nprogress>）
  
  nextjs:
  
  ```
  // .app.js
  import Router from 'next/router'
  import nProgress from 'nprogress'
  import 'nprogress/nprogress.css'

  Router.events.on('routeChangeStart', nProgress.start)
  Router.events.on('routeChangeError', nProgress.done)
  Router.events.on('routeChangeComplete', nProgress.done)
  ```