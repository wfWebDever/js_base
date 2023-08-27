# sticky使用有感 及解决一些头疼问题 
核心在于这个属性是relative和fixed的结合，设置后(必须同时设置top or right or bottom...), 
在临界条件之前是属于relative 达到临界条件后就是fixed的状态，其定位就是设置的top or right.

- 这里说的临界条件指的是滚动， 父级或者最近的祖先级有滚动，当元素到达设置的临界条件时，就会
粘在滚动祖先的相对距离,注意这里说的是相对距离是指最近的滚动祖先元素，比如父级是滚动 那么就是
相对父级，如果最近的滚动元素是页面body那么就是相对body距离

- 当该元素所在的父级也因为滚动脱离视觉范围后 该元素也会随之返回到relative位置.
这可以作为一些动画效果，比如刚开始是粘滞，然后滚动后到了底部的比如footer处后，上面的元素都不在粘滞了

- 特别注意的是，如果该元素所在的父级只包括该元素 也就是说父级高度等于小于该元素,如果设置的父级元素高度大于该元素
也会形成粘滞效果，如果设置父级height: auto，那么该元素不会滚动.
这是因为该元素的最大漂浮范围就是父级， 如果父级跟该元素一样的高度 那么即便滚动也不会有效果，可以设想一下这个情景

## 例子1

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
比如有个设计是这样的 ,有header banner顺序摆放 然后需要header也做粘性定位
刚开始做法是把header absolute定位在banner中，然后监听页面滚动，当滚动时候，设置其为sticky.
但是过程中会有闪烁，最后发现最简洁的做法是把banner margin 负值，让header 浮在banner 上. 
完美收工.

## 例子3
./sticky.html 关于底部End的显示例子，利用了sticky bottom，但是在滑倒底部之前是看不见的，当滚动到底部时
显示出来，用了一个诀窍就是设置为z-index: -1







