# 自定义 MCP 服务器模板

本模板帮助你基于 [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol) 快速搭建自定义工具服务器，支持多种工具扩展。

---

## 1. 引入依赖

```js
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
```

---

## 2. 创建 MCP 服务器实例

```js
const server = new Server(
  {
    name: "your-mcp-server-name", // 自定义服务器名称
    version: "1.0.0", // 版本号
  },
  {
    capabilities: {
      tools: {}, // 工具能力（实际通过后续注册）
      resources: {}, // 资源能力（可选）
    },
  }
);
```

---

## 3. 定义工具列表

```js
const tools = [
  {
    name: "your_tool_name",
    description: "工具功能描述",
    inputSchema: {
      type: "object",
      properties: {
        param1: {
          type: "string",
          description: "参数1说明",
        },
        // ...更多参数
      },
      required: ["param1"], // 必填参数
    },
  },
  // 可以继续添加更多工具
];
```

---

## 4. 注册工具列表处理器

```js
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: tools,
  };
});
```

---

## 5. 注册工具调用处理器

```js
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "your_tool_name":
      return await handleYourTool(args);
    // 可以继续添加更多case
    default:
      throw new Error(`未知工具: ${name}`);
  }
});
```

---

## 6. 工具处理函数示例

```js
async function handleYourTool(args) {
  const { param1 } = args;
  // 这里实现你的业务逻辑
  return {
    content: [
      {
        type: "text",
        text: `你的返回内容，参数值为：${param1}`,
      },
    ],
  };
}
```

---

## 7. 资源相关处理器（可选）

```js
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [],
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async () => {
  throw new Error("资源读取功能未实现");
});
```

---

## 8. 启动服务器

```js
const transport = new StdioServerTransport();
await server.connect(transport);

console.error("MCP服务器已启动，等待连接...");
```

---

## 使用说明

1. **工具扩展**
   - 在 `tools` 数组中添加新工具，定义好 `name`、`description` 和 `inputSchema`。
   - 在 `CallToolRequestSchema` 的 switch 语句中添加对应 case，并实现处理函数。
2. **返回格式**
   - 每个工具处理函数需返回 `{ content: [{ type: "text", text: "..." }] }` 这样的结构，便于 MCP 客户端解析。
3. **通信方式**
   - 通过 `StdioServerTransport`，可与支持 MCP 协议的 AI/自动化平台对接。
4. **安全性**
   - 若涉及外部 API、文件操作、表达式计算等，务必注意安全校验，避免注入风险。

---

你可以直接复制本模板，按需修改工具和逻辑，即可快速搭建自己的 MCP 工具服务器！
