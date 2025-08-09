# 浮动布局与BFC

## 1. 文档流基础

网页是一个多层的结构，通过CSS可以分别为每一层设置样式。对用户来说，只能看到最顶上一层。这些层中，最底下的一层称为**文档流**，它是网页的基础。

我们创建的元素默认都是在文档流中进行排列。元素主要有两种形态：
- 在文档流中
- 脱离文档流

## 2. 浮动(float)的作用与影响

`float`属性可以让元素脱离文档流。当元素设置了`float`属性后，它会尽量向左或向右移动，直到碰到包含框或另一个浮动元素。

### 2.1 浮动的应用场景

- 从纵向布局转为横向布局
- 解决`display:inline-block`元素间的间隙问题（因HTML标签间空格导致）

### 2.2 浮动带来的问题

当子元素设置浮动后，会脱离文档流，导致父元素高度塌陷（父元素高度由子元素内容撑开，子元素脱离后高度变为0）。

## 3. 清除浮动的方法

### 3.1 直接设置父容器高度
```css
.parent {
  height: 200px; /* 根据子元素实际高度设置 */
}
```

### 3.2 添加额外子元素清除浮动
```html
<div class="parent">
  <div class="float-child"></div>
  <div class="clear"></div> <!-- 额外添加的元素 -->
</div>
```
```css
.clear {
  clear: both;
}
```

### 3.3 使用伪元素清除浮动（推荐）
```css
.parent::after {
  content: "";
  display: block;
  clear: both;
}
```

## 4. clear:both 属性的作用

`clear:both`属性告诉元素：其左右两侧都不允许有浮动元素。当一个元素应用了`clear:both`时，浏览器会将该元素放置在所有浮动元素的下方，从而避免与浮动元素重叠，恢复正常的文档流布局。

## 5. ::after 伪类的作用

`::after`伪类用于选中元素的内容之后插入一个虚拟元素。虚拟元素默认是行内元素(`display:inline`)，可以像普通元素一样设置样式。

由于行内元素不会换行，所以通常会加上`display:block`将伪元素转为块级元素，使其能够占据独立一行，并能够设置宽高等属性。

## 6. BFC（块格式化上下文）

### 6.1 BFC的作用

BFC可以解决CSS中的一些常见问题：
- 父子容器margin重叠
- 清除浮动影响

### 6.2 创建BFC的方法

1. 设置`overflow: hidden|auto|scroll`
2. 设置定位`position: absolute|fixed`
3. 设置`display: inline-block|table-cell|flex|grid`
4. 设置`float: left|right`

