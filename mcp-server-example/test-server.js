import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testMCPServer() {
  console.log("🧪 测试MCP服务器...\n");

  const serverPath = path.join(__dirname, "server.js");

  // 启动MCP服务器
  const server = spawn("node", [serverPath], {
    stdio: ["pipe", "pipe", "pipe"],
  });

  let output = "";
  let errorOutput = "";

  server.stdout.on("data", data => {
    output += data.toString();
  });

  server.stderr.on("data", data => {
    errorOutput += data.toString();
  });

  server.on("close", code => {
    console.log("服务器已关闭，退出码:", code);
    console.log("标准输出:", output);
    console.log("错误输出:", errorOutput);
  });

  // 等待服务器启动
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 发送测试请求
  const testRequest = {
    jsonrpc: "2.0",
    id: 1,
    method: "tools/list",
    params: {},
  };

  server.stdin.write(JSON.stringify(testRequest) + "\n");

  // 等待响应
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 关闭服务器
  server.kill();
}

// 运行测试
testMCPServer().catch(console.error);
