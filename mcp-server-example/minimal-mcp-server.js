process.stdin.setEncoding("utf8");

function sendResponse(id, result, error = null) {
  const response = { jsonrpc: "2.0", id };
  if (error) response.error = error;
  else response.result = result;
  console.log(JSON.stringify(response));
}

function sendNotification(method, params = {}) {
  const notification = { jsonrpc: "2.0", method, params };
  console.log(JSON.stringify(notification));
}

let buffer = "";
process.stdin.on("data", chunk => {
  buffer += chunk;
  let newlineIndex;
  while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
    const line = buffer.slice(0, newlineIndex).trim();
    buffer = buffer.slice(newlineIndex + 1);
    if (line) {
      try {
        const message = JSON.parse(line);
        handleMessage(message);
      } catch (e) {
        // 忽略解析错误
      }
    }
  }
});

function handleMessage(message) {
  const { id, method, params } = message;

  if (method === "initialize") {
    sendResponse(id, {
      protocolVersion: "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: { name: "minimal-mcp", version: "1.0.0" },
    });
  } else if (method === "tools/list") {
    sendResponse(id, {
      tools: [
        {
          name: "test_tool",
          description: "测试工具",
          inputSchema: {
            type: "object",
            properties: { text: { type: "string", description: "测试文本" } },
            required: ["text"],
          },
        },
      ],
    });
  } else if (method === "tools/call" && params.name === "test_tool") {
    sendResponse(id, {
      content: [{ type: "text", text: "工具调用成功！" }],
    });
  }
}

// 发送初始化通知
sendNotification("initialized");
