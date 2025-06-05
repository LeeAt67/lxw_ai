## 6.3
### 从单调栈 -> 滑动窗口 -> KMP

#### 单调栈
- **作用：**1，维护单调性，便于快速查找左边第一个比当前小的元素 2，优化复杂度从n^2 -> n
- **实现原理：**每次输入一个数据，遍历容器内是否存在元素并且不断弹出栈顶元素直到找到栈顶比该数小的元素或空（维护栈的单调性），最后入栈
``` javascript
/*
* @func 单调栈
* @param{Array} stk 
* @param{Number} x
* @return{Array}
*/
const monotonicStack(stk,x) => {
  tt = stk.length;
  while(tt && stk[tt] >= x) tt --;
  if(tt){
    console.log(stk[tt]);
  }
  else{
    console.log("-1");
  }
  stk[++ tt] = x;
  return stk;
}
```
[例题：LeetCode：739每日温度](https://leetcode.cn/problems/daily-temperatures/description/)