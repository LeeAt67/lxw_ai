import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 创建MCP服务器实例
const server = new Server(
  {
    name: "advanced-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// 定义高级工具列表
const tools = [
  {
    name: "file_manager",
    description: "高级文件管理器，支持读取、写入、列出文件和目录",
    inputSchema: {
      type: "object",
      properties: {
        action: {
          type: "string",
          enum: ["read", "write", "list", "create", "delete"],
          description: "操作类型",
        },
        path: {
          type: "string",
          description: "文件或目录路径",
        },
        content: {
          type: "string",
          description: "写入内容（仅write和create操作需要）",
        },
        encoding: {
          type: "string",
          default: "utf8",
          description: "文件编码",
        },
      },
      required: ["action", "path"],
    },
  },
  {
    name: "web_search",
    description: "执行网络搜索",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "搜索查询",
        },
        engine: {
          type: "string",
          enum: ["google", "bing", "duckduckgo"],
          default: "google",
          description: "搜索引擎",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "code_analyzer",
    description: "分析代码文件，提供统计信息和建议",
    inputSchema: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "要分析的代码文件路径",
        },
        analysis_type: {
          type: "string",
          enum: ["stats", "complexity", "suggestions"],
          default: "stats",
          description: "分析类型",
        },
      },
      required: ["file_path"],
    },
  },
  {
    name: "database_query",
    description: "执行数据库查询（示例：SQLite）",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "SQL查询语句",
        },
        db_path: {
          type: "string",
          description: "数据库文件路径",
        },
      },
      required: ["query", "db_path"],
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
    case "file_manager":
      return await handleFileManager(args);
    case "web_search":
      return await handleWebSearch(args);
    case "code_analyzer":
      return await handleCodeAnalyzer(args);
    case "database_query":
      return await handleDatabaseQuery(args);
    default:
      throw new Error(`未知工具: ${name}`);
  }
});

// 文件管理器处理器
async function handleFileManager(args) {
  const { action, path: filePath, content, encoding = "utf8" } = args;

  try {
    switch (action) {
      case "read":
        const fileContent = await fs.readFile(filePath, encoding);
        return {
          content: [
            {
              type: "text",
              text: `文件 ${filePath} 的内容：\n\n${fileContent}`,
            },
          ],
        };

      case "write":
        await fs.writeFile(filePath, content, encoding);
        return {
          content: [
            {
              type: "text",
              text: `成功写入文件 ${filePath}`,
            },
          ],
        };

      case "list":
        const items = await fs.readdir(filePath, { withFileTypes: true });
        const itemList = items
          .map(item => {
            const type = item.isDirectory() ? "[目录]" : "[文件]";
            return `${type} ${item.name}`;
          })
          .join("\n");

        return {
          content: [
            {
              type: "text",
              text: `目录 ${filePath} 的内容：\n\n${itemList}`,
            },
          ],
        };

      case "create":
        await fs.writeFile(filePath, content || "", encoding);
        return {
          content: [
            {
              type: "text",
              text: `成功创建文件 ${filePath}`,
            },
          ],
        };

      case "delete":
        const stats = await fs.stat(filePath);
        if (stats.isDirectory()) {
          await fs.rmdir(filePath);
        } else {
          await fs.unlink(filePath);
        }
        return {
          content: [
            {
              type: "text",
              text: `成功删除 ${filePath}`,
            },
          ],
        };

      default:
        throw new Error(`不支持的操作: ${action}`);
    }
  } catch (error) {
    throw new Error(`文件操作失败: ${error.message}`);
  }
}

// 网络搜索处理器
async function handleWebSearch(args) {
  const { query, engine = "google" } = args;

  // 这里可以集成真实的搜索API
  // 现在返回模拟搜索结果
  const searchResults = [
    `搜索结果 1: 关于 "${query}" 的相关信息`,
    `搜索结果 2: ${query} 的详细说明`,
    `搜索结果 3: ${query} 的最新动态`,
  ];

  return {
    content: [
      {
        type: "text",
        text: `使用 ${engine} 搜索 "${query}" 的结果：\n\n${searchResults.join(
          "\n\n"
        )}`,
      },
    ],
  };
}

// 代码分析器处理器
async function handleCodeAnalyzer(args) {
  const { file_path, analysis_type = "stats" } = args;

  try {
    const content = await fs.readFile(file_path, "utf8");
    const lines = content.split("\n");

    let analysis = "";

    switch (analysis_type) {
      case "stats":
        const totalLines = lines.length;
        const codeLines = lines.filter(
          line => line.trim() && !line.trim().startsWith("//")
        ).length;
        const commentLines = lines.filter(line =>
          line.trim().startsWith("//")
        ).length;
        const emptyLines = lines.filter(line => !line.trim()).length;

        analysis =
          `代码统计信息：\n` +
          `总行数: ${totalLines}\n` +
          `代码行数: ${codeLines}\n` +
          `注释行数: ${commentLines}\n` +
          `空行数: ${emptyLines}\n` +
          `代码密度: ${((codeLines / totalLines) * 100).toFixed(1)}%`;
        break;

      case "complexity":
        const functions = content.match(/function\s+\w+/g) || [];
        const classes = content.match(/class\s+\w+/g) || [];
        const imports = content.match(/import\s+/g) || [];

        analysis =
          `代码复杂度分析：\n` +
          `函数数量: ${functions.length}\n` +
          `类数量: ${classes.length}\n` +
          `导入语句: ${imports.length}\n` +
          `平均函数长度: ${(codeLines / Math.max(functions.length, 1)).toFixed(
            1
          )} 行`;
        break;

      case "suggestions":
        const suggestions = [];

        if (lines.length > 500) {
          suggestions.push("文件过长，建议拆分为多个模块");
        }
        if (content.includes("TODO") || content.includes("FIXME")) {
          suggestions.push("发现待办事项，建议及时处理");
        }
        if (content.includes("console.log")) {
          suggestions.push("发现调试代码，建议在生产环境中移除");
        }

        analysis = `代码建议：\n${
          suggestions.length > 0
            ? suggestions.join("\n")
            : "代码质量良好，无明显问题"
        }`;
        break;
    }

    return {
      content: [
        {
          type: "text",
          text: `文件 ${file_path} 的${analysis_type}分析：\n\n${analysis}`,
        },
      ],
    };
  } catch (error) {
    throw new Error(`代码分析失败: ${error.message}`);
  }
}

// 数据库查询处理器
async function handleDatabaseQuery(args) {
  const { query, db_path } = args;

  // 这里可以集成真实的数据库连接
  // 现在返回模拟查询结果
  const mockResults = [
    { id: 1, name: "示例数据1", value: 100 },
    { id: 2, name: "示例数据2", value: 200 },
    { id: 3, name: "示例数据3", value: 300 },
  ];

  return {
    content: [
      {
        type: "text",
        text: `数据库查询结果 (${db_path}):\n\n查询: ${query}\n\n结果:\n${JSON.stringify(
          mockResults,
          null,
          2
        )}`,
      },
    ],
  };
}

// 资源相关处理器
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "file:///example.txt",
        name: "示例文件",
        description: "一个示例文本文件",
        mimeType: "text/plain",
      },
    ],
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async request => {
  const { uri } = request.params;

  if (uri.startsWith("file:///")) {
    const filePath = uri.replace("file:///", "");
    try {
      const content = await fs.readFile(filePath, "utf8");
      return {
        contents: [
          {
            uri: uri,
            mimeType: "text/plain",
            text: content,
          },
        ],
      };
    } catch (error) {
      throw new Error(`无法读取资源: ${error.message}`);
    }
  }

  throw new Error(`不支持的资源URI: ${uri}`);
});

// 启动服务器
const transport = new StdioServerTransport();
await server.connect(transport);

console.error("高级MCP服务器已启动，等待连接...");
