import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mcp = spawn("node", ["minimal-mcp-server.js"], {
  cwd: __dirname,
  stdio: ["pipe", "pipe", "pipe"],
});

mcp.stdout.on("data", data => {
  console.log("MCP 输出:", data.toString());
});

mcp.stderr.on("data", data => {
  console.log("MCP 错误:", data.toString());
});

// 发送 tools/list 请求
setTimeout(() => {
  const request =
    JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/list",
    }) + "\n";

  console.log("发送请求:", request);
  mcp.stdin.write(request);
}, 100);

setTimeout(() => {
  mcp.kill();
}, 1000);
