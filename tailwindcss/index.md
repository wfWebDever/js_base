#Tailwind.css

## 为何要使用，借用官方的说话，结合本身写样式的体验

```html
但是一旦你真正用这种方式构建了一些东西，你很快就会注意到一些非常重要的好处：

你不是在浪费精力发明类名。不再需要添加愚蠢的类名，比如sidebar-inner-wrapper仅仅为了能够设置样式，也不再为真正只是一个 flex 容器的东西的完美抽象名称而苦恼。
你的 CSS 停止增长。使用传统方法，每次添加新功能时，CSS 文件都会变大。使用实用程序，一切都是可重用的，因此您很少需要编写新的 CSS。
做出改变感觉更安全。CSS 是全球性的，当你做出改变时，你永远不知道会破坏什么。HTML 中的类是本地的，因此您可以更改它们而不必担心其他问题。
```

## 实现原理
通过postcss插件将文件中的css代码转换成ast 最后转化成css style 插入到项目生成后的html head中，而且打包过程中会自动删除所有未使用的 CSS 类似与tree shaking.

## 接入方式 参照官网文档
https://tailwindcss.com/docs/utility-first

## 默认配置
https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js

## 字体 颜色等配置
颜色 遵循按照使用文字颜色名称（如红色、绿色等）和数字刻度（其中 50 为浅色，900 为深色）。我发现它比使用抽象名称（如primaryor ）更容易维护danger，相关的样式都可以使用该字段，比如
text-gray bg-gray border-gray等

```
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: '#f3f4f6',
        red: '#ef4444',
        primary: '#fff',
        secondary: '#fff',
        neutral: '#fff'
      }
    }
  },
  plugins: []
}

```

```
// 在MUI组件中使用时
<Typography
           className="text-red"
>
text-red
</Typography>
```


### 字体
- 首先从字体库中下载字体文件
https://fonts.google.com/specimen/Edu+SA+Beginner#type-tester

- 定义到到CSS样式文件这个
```
@font-face {
  font-family: "arima";
  src: url("./assets/fonts/Arima-VariableFont_wght.ttf") format("woff");
}
@font-face {
  font-family: "edu";
  src: url("./assets/fonts/EduSABeginner-VariableFont_wght.ttf") format("woff");
}
body {
  margin: 0;
}
```
- 如果是全局都生效的字体 直接生成到html中
```
@layer base {
  html {
    font-family: "edu", 'arima', 'Helvetica', 'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    '"Noto Sans"',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Noto Color Emoji"';
  }
}
```
- 生成字体库 单独调用
```
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      arima: ['arima', ...defaultTheme.fontFamily.sans],
      edu: ['edu', ...defaultTheme.fontFamily.sans]
    }
  },
  plugins: []
}


// component
<Typography
  className="font-edu"
>
            Almost before we knew
</Typography>
```
