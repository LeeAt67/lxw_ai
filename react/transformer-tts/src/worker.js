import { env } from "@xenova/transformers";
// transformer.js 文本-> 语言
self.onmessage = (e) => {
  const response = e.data.text;
  // 处理文本并发送响应
  self.postMessage(response);
};
