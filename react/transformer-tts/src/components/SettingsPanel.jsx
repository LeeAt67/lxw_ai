// 设置面板组件 - 高级配置选项
import { useState, useEffect } from "react";

const SettingsPanel = ({ onSettingsChange, isVisible }) => {
  const [settings, setSettings] = useState({
    autoPlay: false,
    showNotifications: true,
    reduceMotion: false,
    clearHistoryOnClose: false,
  });

  useEffect(() => {
    // 从localStorage加载设置
    const saved = localStorage.getItem("tts_settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
        onSettingsChange(parsed);
      } catch (e) {
        console.error("Failed to load settings:", e);
      }
    }
  }, [onSettingsChange]);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem("tts_settings", JSON.stringify(newSettings));
    onSettingsChange(newSettings);
  };

  const handleReset = () => {
    const defaultSettings = {
      autoPlay: false,
      showNotifications: true,
      reduceMotion: false,
      clearHistoryOnClose: false,
    };
    setSettings(defaultSettings);
    localStorage.setItem("tts_settings", JSON.stringify(defaultSettings));
    onSettingsChange(defaultSettings);
  };

  if (!isVisible) return null;

  return (
    <div className="mt-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Settings</h3>
        <button
          onClick={handleReset}
          className="text-xs text-gray-500 hover:text-gray-700 transition"
        >
          Reset
        </button>
      </div>
      
      <div className="space-y-3">
        {/* 自动播放 */}
        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-gray-700">Auto-play audio</span>
          </div>
          <input
            type="checkbox"
            checked={settings.autoPlay}
            onChange={(e) => handleSettingChange("autoPlay", e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
          />
        </label>

        {/* 通知 */}
        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="text-sm text-gray-700">Show notifications</span>
          </div>
          <input
            type="checkbox"
            checked={settings.showNotifications}
            onChange={(e) => handleSettingChange("showNotifications", e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
          />
        </label>

        {/* 减少动画 */}
        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm text-gray-700">Reduce motion</span>
          </div>
          <input
            type="checkbox"
            checked={settings.reduceMotion}
            onChange={(e) => handleSettingChange("reduceMotion", e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
          />
        </label>

        {/* 关闭时清除历史 */}
        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="text-sm text-gray-700">Clear history on close</span>
          </div>
          <input
            type="checkbox"
            checked={settings.clearHistoryOnClose}
            onChange={(e) => handleSettingChange("clearHistoryOnClose", e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
};

export default SettingsPanel;

