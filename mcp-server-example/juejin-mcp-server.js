import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 兼容 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取规则文件
const RULES_TEMPLATE_PATH = path.join(__dirname, "juejin_template.md");
const RULES_SIMPLE_PATH = path.join(__dirname, "juejin_rules_simple.md");
const RULES_DETAIL_PATH = path.join(__dirname, "juejin_rules_detail.md");

function readFileContent(filePath) {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    return "";
  }
}

const rulesTemplate = readFileContent(RULES_TEMPLATE_PATH);
const rulesSimple = readFileContent(RULES_SIMPLE_PATH);
const rulesDetail = readFileContent(RULES_DETAIL_PATH);

// 检查点
const CHECK_POINTS = [
  {
    key: "原创",
    check: content => !/原创|翻译/.test(content),
    advice: "建议文章必须原创或本人翻译，有启发性。",
  },
  {
    key: "排版",
    check: content =>
      /\n{3,}/.test(content) ||
      /[\u4e00-\u9fa5]{100,}/.test(content.replace(/\n/g, "")),
    advice: "建议排版优雅，结构清晰，合理分段。",
  },
  {
    key: "标题",
    check: content => /#\s*\S{1,4}$/.test(content),
    advice: "建议标题清晰具体，避免过短或宽泛。",
  },
  {
    key: "标签",
    check: content => !/标签[:：]/.test(content),
    advice: "建议添加合适的技术标签。",
  },
  {
    key: "内容聚焦",
    check: content => /笔记|备忘|摘抄|搬运|转载/.test(content),
    advice: "内容应聚焦开发相关技术、经验、见解，避免纯笔记、搬运。",
  },
  {
    key: "推广",
    check: content => /微信|QQ群|二维码|推广|广告/.test(content),
    advice: "禁止推广、引流、广告等内容。",
  },
  {
    key: "配图",
    check: content => /!\[.*\]\(.*\)/.test(content) === false,
    advice: "建议适当添加与内容相关的配图，突出主题。",
  },
  {
    key: "字数",
    check: content => content.replace(/\s/g, "").length < 250,
    advice: "建议内容不少于250字，讲透一个知识点或问题。",
  },
  {
    key: "评论",
    check: content => /评论区|留言/.test(content),
    advice: "评论需紧扣内容，客观理性，不得推广或攻击。",
  },
];

function checkArticleContent(articleContent) {
  const advices = [];
  for (const point of CHECK_POINTS) {
    if (point.check(articleContent)) {
      advices.push(point.advice);
    }
  }
  return advices;
}

function recommend(articleContent) {
  const recs = [];
  if (/总结|经验|实践/.test(articleContent)) {
    recs.push("可推荐为经验总结或实践类优质内容。");
  }
  if (/观点|思考|见解/.test(articleContent)) {
    recs.push("可推荐为观点分享类优质内容。");
  }
  if (/教程|教学|方法|技巧/.test(articleContent)) {
    recs.push("可推荐为知识教学类优质内容。");
  }
  return recs;
}

// ===== 极简 MCP 输入流处理迁移 =====
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
      serverInfo: { name: "juejin-checker", version: "1.0.0" },
    });
  } else if (method === "tools/list") {
    sendResponse(id, {
      tools: [
        {
          name: "check_juejin_content",
          description: "检查文章内容是否符合掘金平台规范",
          inputSchema: {
            type: "object",
            properties: {
              content: {
                type: "string",
                description: "要检查的文章内容",
              },
            },
            required: ["content"],
          },
        },
      ],
    });
  } else if (
    method === "tools/call" &&
    params.name === "check_juejin_content"
  ) {
    const { content } = params.arguments;
    const advices = checkArticleContent(content);
    const recs = recommend(content);
    let result = "";
    if (advices.length > 0) {
      result += "【检查建议】\n";
      advices.forEach((advice, idx) => {
        result += `${idx + 1}. ${advice}\n`;
      });
    } else {
      result += "内容基本符合掘金规范。\n";
    }
    if (recs.length > 0) {
      result += "\n【内容推荐】\n";
      recs.forEach((rec, idx) => {
        result += `${idx + 1}. ${rec}\n`;
      });
    }
    sendResponse(id, {
      content: [
        {
          type: "text",
          text: result,
        },
      ],
    });
  }
}

// 发送初始化通知
sendNotification("initialized");
