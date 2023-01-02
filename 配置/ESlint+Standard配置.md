配置webstorm默认的standard提示这个那个的错误，于是走另一条道，加载eslint插件。

- 安装 ESlint 插件
- 安装 eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node
- Preferences | Editor | Inspections ｜ JavaScript | Code quality tools 设置成Eslint
- Preferences | Languages & Frameworks | JavaScript | Code Quality Tools | ESLint 
    设置为自动模式
- .eslintrc.js 设置 "extends": "standard",

常用ESLint的命令
- 'yarn info eslint@7.32.0' 查看插件信息

问题解决
1、‘ESLint:please specify Node.js interpreter’ 
需要webstorm中设置node的路径

2、‘TypeError: this.cliEngineCtor is not a constructor’
这是因为webstorm插件plugins中eslint的版本不兼容我们代码中使用的eslint版本，比如eslint8, 
要么降级我们代码中的eslint版本到7以下 要么升级webstorm版本 但是呢我的webStorm是我买断的一个版本，不想再花钱去升级.

所以我自己的项目 就用eslint7, "eslint": "^7.32.0",


