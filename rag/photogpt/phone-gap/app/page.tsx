// "use client"; 是 Next.js 中的指令，用于标记一个组件为客户端组件，使其可以使用 React 的交互功能（如 useState、useEffect）和客户端特有的逻辑.
"use client";
// hooks
import { useChat } from "@ai-sdk/react";
import ChatOutput from "@/components/ChatOutput";
import ChatInput from "@/components/ChatInput";

export default function Home() {
  // chat llm 业务 抽离
  const {
    input, //输入框的值
    messages, // 消息列表
    status, //状态
    handleInputChange, // 输入框值改变时的回调函数
    handleSubmit, // 提交表单时的回调函数
  } = useChat();
  return (
    <main className="max-3=w-3xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">phoneGPT</h1>
      <div className="space-y-4 mb-4 max-h-[80vh] overflow-y-auto">
        <ChatOutput messages={messages} status={status} />
      </div>
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </main>
  );
}
