# 封装的 JSONP

- 只能解决 GET 请求的跨域 问题
- http://localhost:3000/say?callback=biaobaiCllback&wd=i like you
- 需要后端配合
  后端的输出的方式要加 padding
- 不太安全
  全局挂了一个 show callback 函数
