# JSX 考点

- 何为 JSX
  JS in XML(HTML 是 XML 的一种形式)
  React 推崇的 JavaScript 语法扩展（语法糖），允许在 JavaScript 的代码中嵌入 HTML 结构（function return JSX 组件），常用于 React 组件的定义，使得 UI 结构更直观易读。
  React 的一大优点特性。
- JSX 可以直接运行吗？
  不可以
- .styl -> stylus 编译 -> .css
<ul>
<li key={todo.id}>{title}</li> 
<li key={todo.id}>{title}</li>
</ul>
- JSX === React.createElement(tag,props,children ) -> document.createElement(tag)
  document.createElement('ul')
  document.createElement(li)
