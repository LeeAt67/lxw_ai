// 错误处理工具
export class TTSError extends Error {
  constructor(message, code, originalError = null) {
    super(message);
    this.name = "TTSError";
    this.code = code;
    this.originalError = originalError;
  }
}

export const errorMessages = {
  NETWORK_ERROR: "网络连接失败，请检查网络后重试",
  MODEL_LOAD_ERROR: "模型加载失败，请刷新页面重试",
  GENERATION_ERROR: "语音生成失败，请重试",
  INVALID_TEXT: "请输入有效的文本",
  TIMEOUT: "请求超时，请重试",
};

export const handleWorkerError = (error, setError, setDisabled) => {
  console.error("TTS Error:", error);
  let message = errorMessages.GENERATION_ERROR;
  
  if (error.message?.includes("fetch")) {
    message = errorMessages.NETWORK_ERROR;
  } else if (error.message?.includes("model")) {
    message = errorMessages.MODEL_LOAD_ERROR;
  } else if (error.message?.includes("timeout")) {
    message = errorMessages.TIMEOUT;
  }
  
  setError(message);
  setDisabled(false);
};

export const validateText = (text) => {
  if (!text || text.trim().length === 0) {
    throw new TTSError(errorMessages.INVALID_TEXT, "INVALID_TEXT");
  }
  if (text.length > 1000) {
    throw new TTSError("文本过长，请限制在1000字符以内", "TEXT_TOO_LONG");
  }
  return true;
};

