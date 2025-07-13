# 自定义 MCP 服务器

这是一个使用 JavaScript 构建的 MCP (Model Context Protocol) 服务器示例，可以连接到 Cursor 等 AI 编辑器。

## 什么是 MCP？

MCP (Model Context Protocol) 是一个开放协议，允许 AI 模型与外部工具和数据源进行交互。通过 MCP，你可以：

- 为 AI 提供自定义工具
- 访问外部 API 和服务
- 操作文件系统
- 连接数据库
- 执行自定义业务逻辑

## 安装和运行

### 1. 安装依赖

```bash
cd mcp-server-example
npm install
```

### 2. 运行服务器

```bash
npm start
```

或者使用开发模式（自动重启）：

```bash
npm run dev
```

## 连接到 Cursor

### 1. 创建 MCP 配置文件

在 Cursor 中，你需要创建一个 MCP 配置文件。通常位于：

**Windows:**

```
%APPDATA%\Cursor\User\globalStorage\cursor.mcp\servers.json
```

**macOS:**

```
~/Library/Application Support/Cursor/User/globalStorage/cursor.mcp/servers.json
```

**Linux:**

```
~/.config/Cursor/User/globalStorage/cursor.mcp/servers.json
```

### 2. 配置服务器

在`servers.json`文件中添加你的 MCP 服务器配置：

```json
{
  "mcpServers": {
    "my-custom-server": {
      "command": "node",
      "args": ["/path/to/your/mcp-server-example/server.js"],
      "env": {}
    }
  }
}
```

请将`/path/to/your/mcp-server-example/server.js`替换为你实际的服务器文件路径。

### 3. 重启 Cursor

配置完成后，重启 Cursor 以使配置生效。

## 可用工具

这个 MCP 服务器提供了以下工具：

### 1. get_weather

获取指定城市的天气信息

**参数：**

- `city` (string): 城市名称

**示例：**

```
获取北京的天气信息
```

### 2. calculate

执行数学计算

**参数：**

- `expression` (string): 数学表达式

**示例：**

```
计算 2 + 3 * 4
```

### 3. file_operations

文件操作工具

**参数：**

- `operation` (string): 操作类型 ("read", "write", "list")
- `path` (string): 文件路径
- `content` (string, 可选): 写入内容（仅 write 操作需要）

**示例：**

```
列出当前目录的文件
读取文件内容
写入文件内容
```

## 扩展功能

### 添加新的工具

1. 在`tools`数组中添加新工具定义
2. 在`CallToolRequestSchema`处理器中添加对应的 case
3. 实现工具的具体逻辑

### 集成真实 API

你可以将模拟数据替换为真实的 API 调用：

```javascript
// 示例：集成真实天气API
async function handleGetWeather(args) {
  const { city } = args;

  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${city}`
  );
  const data = await response.json();

  return {
    content: [
      {
        type: "text",
        text: `${city}的天气：${data.current.temp_c}°C, ${data.current.condition.text}`,
      },
    ],
  };
}
```

### 添加资源支持

MCP 还支持资源（Resources）功能，可以用于：

- 文件系统访问
- 数据库连接
- 外部数据源

## 故障排除

### 常见问题

1. **服务器无法启动**

   - 检查 Node.js 版本（需要 16+）
   - 确认所有依赖已安装
   - 检查文件路径是否正确

2. **Cursor 无法连接**

   - 确认配置文件路径正确
   - 检查服务器是否正在运行
   - 重启 Cursor

3. **工具调用失败**
   - 检查工具参数是否正确
   - 查看服务器控制台错误信息
   - 确认工具处理器已正确实现

### 调试模式

启用详细日志：

```javascript
// 在server.js开头添加
process.env.DEBUG = "mcp:*";
```

## 安全注意事项

1. **输入验证**：始终验证用户输入
2. **权限控制**：限制文件系统访问范围
3. **API 密钥**：不要在代码中硬编码敏感信息
4. **错误处理**：妥善处理异常情况

## 更多资源

- [MCP 官方文档](https://modelcontextprotocol.io/)
- [Cursor MCP 文档](https://cursor.sh/docs/mcp)
- [MCP SDK 文档](https://github.com/modelcontextprotocol/js-sdk)

## 许可证

MIT License
