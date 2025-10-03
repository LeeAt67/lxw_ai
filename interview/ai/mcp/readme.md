# mcp

- function call
  可以让 LLM 突破自身知识和能力的局限，通过调用外部工具或 API 来获取实时信息、执行计算或操作，从而获取最新数据精确计算与外部系统交互的复杂任务。

- mcp Model Context Protocol
  是一个协议，类似于 web 开发的 Restful 协议，如何将外部资源暴露给 LLM 的协议和编程风格。
  是 Function Call 的升级版

在做各种 Function Call 有点乱的时候，mcp 统一了一切。

mcp 是 LLM 与外界之间的通信协议，它就好像 USB，LLM 训练完后的不了解的知识。

LLM 本身不知道怎么调用地图、数据库、搜索引擎，MCP 规定了标准上下文交换方式，让模型能像调用 API 一样去访问外部能力。

## 举例

高德地图 MCP 请帮我规划从公司到机场的路线。
模型根据高德地图 MCP 插件，获取实时路径和交通数据。

## 意义

- LLM 输出更可靠
- 降低集成成本（自由系统和 LLM 集成）
- 数据安全可控
  高德地图接入 MCP，就像 LLM 的眼睛和耳朵，让 AI 真正理解和使用实时世界。

- 安装 mcp 客户端 cline
- 高德地图 apikey
## mcp 的使用
- LLM
- mcp client cline/cursor
  - 配置 mcp server
- LLM -> client -> server Transport 通信
