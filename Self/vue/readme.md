# Vue

构建用户界面的 JS 框架
提供声明式、组件化的编程模型

- 单文件组件（Single-File Components） SFC
  JS、HTML、CSS 封装在一起 类似于 React 中的组件

- API 风格

  - 选项式 API 和 组合式 API

- 选项式

```vue
<script>
export default {
  // 组件选项
  // 此处声明一些响应式状态
  data() {
    return {
      data: 0,
      msg: "hello",
    };
  },
};
</script>

<template>
  <p>{{ this }}</p>
  {"data":0,"msg":"hello"} JS对象
  <p></p>
</template>
```

- 组合式
  ```vue
  <script setup>
  import { ref } from "vue";
  const counter = recreative({ count: 0 });
  const message = ref("hello");
  // 组件逻辑
  // 此处声明一些响应式状态
  </script>
  <template>
    <h1>{{ counter.count }}</h1>
    <p>{{ message }}</p>
  </template>
  ```

## attribute 绑定

指令由`v-` 作为前缀  作为渲染的DOM应用的特殊响应式行为 简单来说就是 将此元素的innerHTML与rawHtml 属性保持同步

<div v-bind:id="id"></div>  使用频繁-> <div :id="id">  </div>

```vue
<scirpt setup>
import {ref} from "vue"
const titleClass
</script>
```
