# 流式输出

- 为什么会考这道题？
  25 年大厂必考题

  - LLM 聊天机器人（23 年的 AI 爆款-> 24 年 推理 -> 25 年 AI Agent 年） AI 产品
  - 流式输出属于用户体验，前端职责

- 为何需要流式输出？

  - 边生成边输出？
    后端 、 LLM API 方式提供我们？
    AIGenerateCotent 生成式的大模型 一个 token 一个 token transform （google） 出来的
    “我是你的 assistant，” token 开销付费的
    更快的看到响应

- 前端的职责

  - 良好的用户体验
  - 尽快返回结果
    障眼法 生成要花事件哦， 我愿意等
    最懂用户心理的

- 步骤
  - 前端能实现流式输出？
    setInterval 异步 时间机制 message
  - 后端又怎么实现？
    socket 长连接
    http 请求是基于响应式简单协议 关闭连接？
    http 2.0 server push 服务端推送

## 全栈能力

- npm init -y node 后端
- npm i express 老牌的 node 框架
