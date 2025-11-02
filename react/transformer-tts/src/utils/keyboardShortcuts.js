// 键盘快捷键工具
import { useEffect } from "react";

export const useKeyboardShortcut = (key, callback, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyPress = (e) => {
      // 检查是否按下了Ctrl或Cmd
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      
      if (isCtrlOrCmd && e.key === key) {
        e.preventDefault();
        callback(e);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [key, callback, enabled]);
};

export const shortcuts = {
  GENERATE: "Enter", // Ctrl+Enter
  CLEAR: "k", // Ctrl+K
  PLAY_PAUSE: " ", // Space
};

