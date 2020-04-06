配置webstorm默认的standard提示这个那个的错误，于是走另一条道，加载eslint插件。

- 安装 ESlint 插件
- 安装 eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node
- Preferences | Editor | Inspections ｜ JavaScript | Code quality tools 设置成Eslint
- Preferences | Languages & Frameworks | JavaScript | Code Quality Tools | ESLint 
    设置为自动模式
- .eslintrc.js 设置 "extends": "standard",
