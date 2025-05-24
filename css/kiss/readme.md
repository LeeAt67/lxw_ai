# css animation

- html
  div
  眉毛
  嘴巴
  小酒窝
- css
  ? 在一起?
  border-radius
  animation 世界

- html结构快捷输入方式
  div#l-ball.ball  emmet 语法  css 选择器
- id 唯一
- class 类名 
- .container?
  盒子  页面居中
  水平垂直居中
- .container>#l-ball.ball+#r-ball.ball
  '>' 子元素选择器
  '+' 兄弟元素选择器

- display 属性
  div block
  span, i a inline
  display 切换行内块级的格式化上下文能力
  inline-block  行内块级  既可以设置宽高 又可以 在一行
  inline 行内  不可以设置宽高
  block  块级  独占一行

- 面向对象的css
  多态
  复用  多类名
- 定位
  - position 定位
    static 没有定位能力
    relative 相对定位
      - 子元素相对它定位
      - 基于其原来默认文档流中的位置来进行定位，不脱离原来文档流（相对于自身的位置定位）
    absolute 绝对定位
      - 脱离原来文档流，元素的原来位置被其他元素占用，其相对于第一个非静态定位的父级元素进行定位,没有position属性默认position属性值为static（absolute 找到离它（管着它的最近的position 不为static 的属性定位）

    直到body 为止
    .container absolute 相对body来定位
