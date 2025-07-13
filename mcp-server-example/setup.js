#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import os from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupMCP() {
  console.log("🚀 MCP服务器设置向导");
  console.log("=====================\n");

  try {
    // 1. 检查Node.js版本
    const nodeVersion = process.version;
    console.log(`✅ Node.js版本: ${nodeVersion}`);

    if (parseInt(nodeVersion.slice(1).split(".")[0]) < 16) {
      console.error("❌ 需要Node.js 16或更高版本");
      process.exit(1);
    }

    // 2. 安装依赖
    console.log("\n📦 安装依赖...");
    const { execSync } = await import("child_process");
    execSync("npm install", { stdio: "inherit" });
    console.log("✅ 依赖安装完成");

    // 3. 获取Cursor配置路径
    const platform = os.platform();
    let cursorConfigPath;

    switch (platform) {
      case "win32":
        cursorConfigPath = path.join(
          process.env.APPDATA,
          "Cursor",
          "User",
          "globalStorage",
          "cursor.mcp",
          "servers.json"
        );
        break;
      case "darwin":
        cursorConfigPath = path.join(
          os.homedir(),
          "Library",
          "Application Support",
          "Cursor",
          "User",
          "globalStorage",
          "cursor.mcp",
          "servers.json"
        );
        break;
      default:
        cursorConfigPath = path.join(
          os.homedir(),
          ".config",
          "Cursor",
          "User",
          "globalStorage",
          "cursor.mcp",
          "servers.json"
        );
    }

    // 4. 创建配置目录
    const configDir = path.dirname(cursorConfigPath);
    await fs.mkdir(configDir, { recursive: true });

    // 5. 生成配置文件
    const serverPath = path.resolve(__dirname, "server.js");
    const advancedServerPath = path.resolve(__dirname, "advanced-server.js");

    const config = {
      mcpServers: {
        "my-basic-mcp-server": {
          command: "node",
          args: [serverPath],
          env: {},
        },
        "my-advanced-mcp-server": {
          command: "node",
          args: [advancedServerPath],
          env: {
            NODE_ENV: "production",
          },
        },
      },
    };

    // 6. 写入配置文件
    await fs.writeFile(cursorConfigPath, JSON.stringify(config, null, 2));
    console.log(`✅ Cursor配置文件已创建: ${cursorConfigPath}`);

    // 7. 显示使用说明
    console.log("\n📋 使用说明:");
    console.log("1. 重启Cursor编辑器");
    console.log("2. 在Cursor中，你可以使用以下工具:");
    console.log("   - get_weather: 获取天气信息");
    console.log("   - calculate: 执行数学计算");
    console.log("   - file_operations: 文件操作");
    console.log("   - file_manager: 高级文件管理");
    console.log("   - web_search: 网络搜索");
    console.log("   - code_analyzer: 代码分析");
    console.log("   - database_query: 数据库查询");

    console.log("\n🔧 测试服务器:");
    console.log("运行以下命令测试服务器:");
    console.log(`  node ${serverPath}`);

    console.log("\n🎉 设置完成！");
  } catch (error) {
    console.error("❌ 设置失败:", error.message);
    process.exit(1);
  }
}

// 运行设置
setupMCP();
