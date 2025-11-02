// 历史记录面板组件 - 保存和重播历史记录
import { useState, useEffect } from "react";

const HistoryPanel = ({ audioUrl, text, onSelect, isVisible }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // 从localStorage加载历史记录
    const saved = localStorage.getItem("tts_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history:", e);
      }
    }
  }, []);

  useEffect(() => {
    // 当有新音频时保存到历史记录
    if (audioUrl && text) {
      const newEntry = {
        id: Date.now(),
        text: text.substring(0, 100), // 限制显示长度
        audioUrl,
        timestamp: new Date().toLocaleString(),
      };
      const updated = [newEntry, ...history].slice(0, 20); // 最多保存20条
      setHistory(updated);
      localStorage.setItem("tts_history", JSON.stringify(updated));
    }
  }, [audioUrl]); // 只依赖audioUrl

  const handleDelete = (id, e) => {
    e.stopPropagation();
    const filtered = history.filter((item) => item.id !== id);
    setHistory(filtered);
    localStorage.setItem("tts_history", JSON.stringify(filtered));
  };

  const handleClearAll = () => {
    setHistory([]);
    localStorage.removeItem("tts_history");
  };

  if (!isVisible) return null;

  return (
    <div className="mt-4 bg-white rounded-lg shadow-lg p-4 max-h-64 overflow-y-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800">History</h3>
        {history.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-xs text-red-500 hover:text-red-700 transition"
          >
            Clear All
          </button>
        )}
      </div>
      {history.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          No history yet
        </div>
      ) : (
        <div className="space-y-2">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className="p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 
              transition group flex items-start gap-2"
            >
              <svg className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" fill="none" 
                stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 truncate">{item.text}</p>
                <p className="text-xs text-gray-400">{item.timestamp}</p>
              </div>
              <button
                onClick={(e) => handleDelete(item.id, e)}
                className="opacity-0 group-hover:opacity-100 transition p-1 
                hover:bg-red-100 rounded"
              >
                <svg className="w-4 h-4 text-red-500" fill="none" 
                  stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPanel;

