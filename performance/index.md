# performance 

三大影响

- CLS 页面布局偏移 
大体意思是页面加载时某个模块被其他模块或者本身偏移了当初的位置 比如文字 按钮 图片没固定高度等

检测方法：通过chrome中Lighthouse 和performance进行排查, 查看“Web Vitals”轨道中的“Experience”轨道或布局转换 (LS) 符号，以查找转换发生的时间。
解决方案:
1.图片设置宽高
2. mui组件只使用Box结合tailwind的 hidden flex 以及md: lg:等响应式，因为其他组件使用后 会比tailwindcss加载慢 导致布局偏移
3. 在网页字体加载期间，所有文本都保持可见状态，使用font-display: swap 设置特殊字体在未下载前使用系统字体

参考：https://www.semrush.com/blog/what-is-cls/?kw=&cmp=AA_SRCH_DSA_Blog_EN&label=dsa_pagefeed&Network=g&Device=c&utm_content=622582344887&kwid=dsa-1754979150845&cmpid=18361936995&agpid=141795398095&BU=Core&extid=60114129467&adpos=&gclid=Cj0KCQjw2cWgBhDYARIsALggUhpvqrSI48hMUz1oiCfjeXi1PeAH7ArOHkWRSfy7kk4qPOa541wqQ9UaAoV2EALw_wcB


- 最大内容绘制(LCP)
1 可视范围内
2 资源或者文本块的加载时间 
3 通过page speed 网站， 结合 network中资源的加载顺序排查问题

一般最容易发生和解决的就是图片的加载效率，解决思路是：
1 使用preload 优先加载
2 使用CDN
3 使用webp格式减少图片大小

- 首次输入延迟(FID) 
