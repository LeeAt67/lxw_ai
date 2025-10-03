# 手写 扁平化数组

数组扁平化,就是把一个多维数组转成一维数组

- 递归
  - 记忆模块构建
  - Array.isArray
  - 递归本意 抽象
    - res.concat(flatten(item));
  - 递归出口
    当 item 不是数组时,直接 push 到 res 中
- reduce
- 栈模拟
- es6 flat 新方法
