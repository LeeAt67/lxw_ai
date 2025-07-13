import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// 创建MCP服务器实例
const server = new Server(
  {
    name: "my-custom-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// 定义工具列表
const tools = [
  {
    name: "get_weather",
    description: "获取指定城市的天气信息",
    inputSchema: {
      type: "object",
      properties: {
        city: {
          type: "string",
          description: "城市名称",
        },
      },
      required: ["city"],
    },
  },
  {
    name: "calculate",
    description: "执行数学计算",
    inputSchema: {
      type: "object",
      properties: {
        expression: {
          type: "string",
          description: '数学表达式，如 "2 + 3 * 4"',
        },
      },
      required: ["expression"],
    },
  },
  {
    name: "file_operations",
    description: "文件操作工具",
    inputSchema: {
      type: "object",
      properties: {
        operation: {
          type: "string",
          enum: ["read", "write", "list"],
          description: "操作类型",
        },
        path: {
          type: "string",
          description: "文件路径",
        },
        content: {
          type: "string",
          description: "写入内容（仅write操作需要）",
        },
      },
      required: ["operation", "path"],
    },
  },
  {
    name: "web_search",
    description: "通过关键词进行网络搜索",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "搜索关键词",
        },
      },
      required: ["query"],
    },
  },
];

// 注册工具列表处理器
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: tools,
  };
});

// 注册工具调用处理器
server.setRequestHandler(CallToolRequestSchema, async request => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "get_weather":
      return await handleGetWeather(args);
    case "calculate":
      return await handleCalculate(args);
    case "file_operations":
      return await handleFileOperations(args);
    case "web_search":
      return await handleWebSearch(args);
    default:
      throw new Error(`未知工具: ${name}`);
  }
});

// 天气工具处理器
async function handleGetWeather(args) {
  const { city } = args;
  const key = "f62f965c0aeb3b417df2911304108230"; // TODO: 替换为你的高德Web服务API Key

  // 1. 获取adcode
  const adcodeRes = await fetch(
    `https://restapi.amap.com/v3/config/district?keywords=${encodeURIComponent(
      city
    )}&key=${key}`
  );
  const adcodeData = await adcodeRes.json();
  if (
    adcodeData.status !== "1" ||
    !adcodeData.districts ||
    adcodeData.districts.length === 0
  ) {
    return {
      content: [
        {
          type: "text",
          text: `未能获取${city}的adcode，无法查询天气。`,
        },
      ],
    };
  }
  const adcode = adcodeData.districts[0].adcode;

  // 2. 查询天气
  const weatherRes = await fetch(
    `https://restapi.amap.com/v3/weather/weatherInfo?city=${adcode}&key=${key}`
  );
  const weatherData = await weatherRes.json();

  if (
    weatherData.status === "1" &&
    weatherData.lives &&
    weatherData.lives.length > 0
  ) {
    const live = weatherData.lives[0];
    return {
      content: [
        {
          type: "text",
          text: `${live.province}${live.city}当前天气：${live.weather}，温度：${live.temperature}°C，湿度：${live.humidity}%`,
        },
      ],
    };
  } else {
    return {
      content: [
        {
          type: "text",
          text: `未能获取${city}的天气信息。`,
        },
      ],
    };
  }
}

// 计算工具处理器
async function handleCalculate(args) {
  const { expression } = args;

  try {
    // 注意：在生产环境中应该使用更安全的表达式解析器
    const result = eval(expression);
    return {
      content: [
        {
          type: "text",
          text: `计算结果：${expression} = ${result}`,
        },
      ],
    };
  } catch (error) {
    throw new Error(`计算错误: ${error.message}`);
  }
}

// 文件操作工具处理器
async function handleFileOperations(args) {
  const { operation, path, content } = args;

  // 这里应该实现真实的文件操作
  // 现在返回模拟响应
  switch (operation) {
    case "read":
      return {
        content: [
          {
            type: "text",
            text: `读取文件 ${path} 的内容（模拟）`,
          },
        ],
      };
    case "write":
      return {
        content: [
          {
            type: "text",
            text: `写入内容到文件 ${path}（模拟）`,
          },
        ],
      };
    case "list":
      return {
        content: [
          {
            type: "text",
            text: `列出目录 ${path} 的内容（模拟）`,
          },
        ],
      };
    default:
      throw new Error(`不支持的操作: ${operation}`);
  }
}

// 网络搜索工具处理器
async function handleWebSearch(args) {
  const { query } = args;
  // 使用 DuckDuckGo API 进行搜索（如有需要可更换为其他API）
  const res = await fetch(
    `https://api.duckduckgo.com/?q=${encodeURIComponent(
      query
    )}&format=json&pretty=1`
  );
  const data = await res.json();
  if (data.RelatedTopics && data.RelatedTopics.length > 0) {
    const results = data.RelatedTopics.slice(0, 3)
      .map(item => item.Text || item.Result)
      .filter(Boolean);
    return {
      content: [
        {
          type: "text",
          text: `搜索“${query}”结果：\n${results.join("\n")}`,
        },
      ],
    };
  } else {
    return {
      content: [
        {
          type: "text",
          text: `未找到与“${query}”相关的内容。`,
        },
      ],
    };
  }
}

// 资源相关处理器（可选）
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [],
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async () => {
  throw new Error("资源读取功能未实现");
});

// 启动服务器
const transport = new StdioServerTransport();
await server.connect(transport);

console.error("MCP服务器已启动，等待连接...");
