# sticky使用有感 及解决一些头疼问题 
核心在于这个属性是relative和fixed的结合，设置后(必须同时设置top or right or bottom...), 
在临界条件之前是属于relative 达到临界条件后就是fixed的状态，其定位就是设置的top or right.

这里说的临界条件指的是滚动， 父级或者最近的祖先级有滚动，当元素到达设置的临界条件时，就会
粘在滚动祖先的相对距离,注意这里说的是相对滚动祖先元素.

还有一个注意点 就是 当该元素所在的父级也滚动出视觉范围后 该元素也会随之返回到relative位置.

## 

```
<main class="main-container">
  <header class="main-header">HEADER</header>
  <div class="main-content">MAIN CONTENT</div>
  <footer class="main-footer">FOOTER</footer>
</main>
<br><br><br><br>
```

```
body{color:#fff; font-family:arial; font-weight:bold; font-size:40px; }
.main-container{ max-width:600px; margin:0 auto; border:solid 10px green; padding:10px; margin-top:40px;}
.main-container *{padding:10px;background:#aaa; border:dashed 5px #000;}
.main-container * + *{margin-top:20px;}
.main-header{
  height:50px; background:#aaa;
}
.main-content{
  min-height:1000px;
}

.main-footer{position:-webkit-sticky; position:sticky; bottom:0; border-color:red;}
```

例子：https://elad.medium.com/css-position-sticky-how-it-really-works-54cd01dc2d46

## 例子2
比如有个设计是这样的 ,有header banner 然后需要也做粘性定位
刚开始做法是把header absoulute定位在banner中，然后监听页面滚动，当滚动时候，设置其为sticky.
但是过程中会有闪烁，最后发现最简洁的做法是 把banner margin 父值，让header 浮在banner 上. 这样 不用动态调整定位值.
完美收工.






