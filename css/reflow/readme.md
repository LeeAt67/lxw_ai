# 回流重绘

- 布局的难点 列式布局和理解 BFC/FFC
  -html 根元素 最外层的第一个 BFC 元素
  Block Formating Context 块级从上到下，行内从左到右，BFC 格式化上下文
  有了文档流
- float overflow:hidden flex
- 有没有什么标签 可以做列式布局 table
  tr td
- 为什么不用？
  - 触发太多的回流和重绘
  - 语义不和 table 数据表
    tr row
    td column
  - 不够灵活 只适合做表格

## 回流和重绘

- 回流 重排 reflow
  当 RenderTree 中部分或全部元素的尺寸，结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程叫回流。
  table 不适合，table 中局部的改变，会触发整个 table 的回流重排
  火烧赤壁
  display:none 不参与回流重绘 性能优化的一种方案
  - 触发回流（重排 reflow）的方式
  1. 页面首次渲染 严格意义不是 ， 0 -> 有 最耗时 网页每慢 0.1s
     少 1000 万 爽
  2. 浏览器窗口的大小改变
  3. 元素尺寸或位置发生改变（transition，transform/opacity 新图层除外）
  4. 元素内容的变化
     appendChild removeChild
  5. display:none block
  6. 字体大小的变化
  7. 激活 css 伪类 :hover
     color 改变: ？浏览器需要重新计算元素的样式和布局
  8. 查询某些属性或调用某些方法时
  - img.getBoundingClientRect()
    返回一个 ret{}对象
- 重绘 repaint
  当页面元素样式的改变并不影响它在文档流中的位置
  color background-color visibility hidden show

## 页面是怎么渲染的？

- 输入 url
- 下载 html
  - 下载字节
  - html 字符 utf-8 编码
  - 解析 html 开关标签 属性...
  - 节点对象
  - 构建 DOM 树
- link css 下载 css
  - 下载字节码 Content-Type text/html txt/css
  - 编码 utf-8 得到 css 文本
  - token 词法分析
  - css rule 节点
  - cssOM 树
  - RenderTree
  - Layout 树
    布局，和模型， 大小 确定元素在文档流中的位置和大小
  - 图层
    - z-index
    - position:flxed 弹窗
    - transition + transform / opacity animation
    - translate(50%,50%,50%) Z GPU 加速
      1 个图层 主要文档流图层 = DOM 树 + CSSOM -> RenderTree <-> LayoutTree
      2 个图层 = DOM 树 + CSSOM -> RenderTree <-> Layout
      .....
    - 图层的合并
    - 浏览器的渲染引擎 绘制平面 像素点控制
