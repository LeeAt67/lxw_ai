/**
 * chat 聊天
 *
 */
const DEEPSEEK_CHAT_API_URL = "https://api.deepseek.com/chat/completions";
const KIM_CHAT_API_URL = "https://api.moonshot.cn/v1/chat/completions";

// console.log(process.env.VITE_DEEPSEEK_API_KEY, '------');
export const chat = async (
  messages,
  api_url = DEEPSEEK_CHAT_API_URL,
  api_key = import.meta.env.VITE_DEEPSEEK_API_KEY,
  model = "deepseek-chat"
) => {
  try {
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${api_key}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
      }),
    });
    const data = await response.json();
    return {
      code: 0,
      data: {
        role: "assistant",
        content: data.choices[0].message.content,
      },
    };
  } catch (err) {
    return {
      code: 0,
      msg: "出错了...",
    };
  }
};

export const kimiChat = async (messages) => {
  const res = await chat(
    messages,
    KIM_CHAT_API_URL,
    import.meta.env.VITE_KIMI_API_KEY,
    "moonshot-v1-auto"
  );
  return res;
};

export const generateAvatar = async (text) => {
  // 设计prompt
  const prompt = `
  你是一个经验丰富的动漫头像设计师，请根据以下信息生成一个动漫头像：
  昵称: ${text}
  个性签名: ${text}
  头像要求：
  1. 头像为动漫风格
  2. 头像为正面头像
  3. 头像为彩色
  4. 头像为高清
  5. 头像为1:1比例
  `;
};
