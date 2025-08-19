# http 各个版本的特性

- OSI 七层协议
- 基于 TCP/IP
- 三次握手/四次握手
- http/https
- 浏览器缓存
- http 各版本的特性
- TCP 和 UDP 区别

## 版本特性

- 讲清楚有哪些版本
  HTTP 0.9
  Hyper Text Transfer Protocol
  最早的版本，只支持 GET 请求响应只有 html 文本，没有 header
  只能传输简单网页、连图片、css、JS 都不能传
  image/jpg text/css text/js

  HTTP 1.0
  引入了请求头 header，能传输多种类型数据
  图片等

  - 虽然有 cookie 但是仍然是无状态的
    每次请求都要重新建立 TCP 链接
    开销浪费 同域名下的资源，一条路
    早期用户并不是那么多
    http 基于请求响应的简单协议 TCP 链接，要断开

  HTTP 1.1

  - 用户太多了，一定要解决 TCP 链接每次都重新建立的问题
  - 推出了长链接
    Connection:kepp-alive
    一个 TCP 可以处理多个请求，浏览器通过一个 TCP 链接连续请求
    页面、图片、脚本等多个资源，服务器处理完不会立即断开，而是保持连接，后续请求无需重新建立链接，节省时间和性能开销 提高加速速度

    管道化
