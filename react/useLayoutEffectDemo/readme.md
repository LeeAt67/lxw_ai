# useLayoutEffect

- useEffect
    副作用
    - 当渲染完成之后
    - 更新
    - 移除

- useLayoutEffect
    副作用
    dom更新之后
    阻塞页面的渲染
    在页面渲染之前

- 能解决什么问题
  防“闪烁” 用户体验
  类似“同步”拿到响应式之后的元素的样式

useEffect：异步，不会影响页面渲染速度，副作用代码在页面“显示”后执行。
useLayoutEffect：同步，副作用代码在页面“显示”前执行，适合需要“精确控制 DOM”的场景。