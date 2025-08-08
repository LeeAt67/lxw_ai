# 进阶跨域方案 cors

- 日常用的最多的跨域解决方案
  JSONP 不跨域
  cors 跨域的
  浏览器会发送 **CORS** 请求，如果服务器端的响应头设置了 Access-Control-Allow-Origin，
  后端实现了 CORS，可以跨域
  加上\* 表示所有的域名都可以访问
  白名单

  - 简单跨域请求
    GET/POST/HEAD 简单设置下 Access-Control-Allow-Origin 就好
    Content-Type text/plain multipart/form-data
    application/x-www-form-urlencoded
  - 复杂跨域请求
    其他的方法 安全升级
    - 预检请求
      200
      Access-Control-Allow-Methods
      Access-Control-Allow-Headers
      ...
      METHOD OPTIONS
    - 真正的请求
