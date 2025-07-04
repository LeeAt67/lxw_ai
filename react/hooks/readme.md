# react hooks 编程
- useState 
  - 非常好用的函数式编程
    函数是一等对象（原生JS）
    函数也是类（JS 原型式面向对象）
    函数也是组件 return JSX
  - 以use 开头， 函数式编程
- useEffect
  - 副作用

- 生命周期 lifecycle 函数
  - mounted 挂载后 渲染完成
    只在渲染完成后执行，更新后不执行 []
  - updated 更新后 [] 依赖项
  - 卸载后的副作用？ ummounted
    - 定时器等会造成内存泄漏的风险，要回收或取消
    - 请求数据 卸载时，响应式数据和DOM 不在了， 请求也取消

- 组件应该在什么时候去请求接口呢？
  - 组件的第一时间渲染是最重要的
  - useEffect
    - 不会和渲染争抢
  - 依赖项为[] 
    - 组件状态发生改变不需要再次请求
- 为什么useEffect 函数不可以直接用async
  - 再声明一个async函数
  - 执行
  - clean-up