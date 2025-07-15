# 掘金写作规范 MCP 插件开发指南

## 目标

开发一个自定义 MCP 插件，能够根据掘金写作规范文档，对输入的文章内容进行规范性检查和指导，输出修改建议。

---

## 1. 准备工作

1. **整理掘金写作规范文档**
   - 将规范内容保存为纯文本文件（如 `juejin_rules.txt`），放在 `mcp-server-example` 目录下。
2. **准备 Node.js 环境**
   - 确保已安装 Node.js。
   - 进入 `mcp-server-example` 目录。

---

## 2. 插件开发步骤

### 步骤一：新建插件文件

在 `mcp-server-example` 目录下新建 `juejin-article-checker.js`。

### 步骤二：编写插件逻辑

- 读取规范文档内容。
- 接收用户文章内容。
- 根据规范进行检查，输出建议。

#### 示例代码：

```js
// juejin-article-checker.js
const fs = require("fs");
const path = require("path");

const rulesPath = path.join(__dirname, "juejin_rules.txt");
const rules = fs.readFileSync(rulesPath, "utf-8");

module.exports = {
  name: "juejin-article-checker",
  description: "根据掘金写作规范对文章进行检查",
  async handler({ article }) {
    const suggestions = [];
    // 示例：检查是否有“总结”小节
    if (!article.includes("总结")) {
      suggestions.push("建议添加“总结”小节。");
    }
    // 可根据 rules 内容扩展更多规则
    return {
      suggestions,
      rules,
    };
  },
};
```

---

## 3. 注册插件

在 `server.js` 或 `advanced-server.js` 中引入并注册插件：

```js
const juejinChecker = require("./juejin-article-checker");
// ...
plugins.push(juejinChecker);
```

---

## 4. 调用插件

通过 MCP 接口传入文章内容，返回规范性建议。例如：

```js
const result = await juejinChecker.handler({ article: "你的文章内容..." });
console.log(result.suggestions);
```

---

## 5. 进阶用法：结合 AI 大模型

- 可将规范文档和文章内容拼接为 prompt，调用 AI 大模型（如 OpenAI GPT）自动生成建议。
- MCP 插件负责拼接 prompt 和调用 API。

---

## 6. 总结

- 整理规范文档，开发插件，注册并调用。
- 可用规则/正则/AI 等方式输出建议。
- 适合自动化文章规范性检查和写作指导。
