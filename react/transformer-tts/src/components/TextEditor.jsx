// 文本编辑器组件 - 增强的文本输入功能
import { useState } from "react";

const TextEditor = ({ value, onChange, onClear }) => {
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (e) => {
    const text = e.target.value;
    setWordCount(text.split(/\s+/).filter((w) => w.length > 0).length);
    onChange(e);
  };

  const handleClear = () => {
    onChange({ target: { value: "" } });
    setWordCount(0);
    onClear?.();
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="text" className="block text-sm font-medium text-gray-600">
          Text
        </label>
        <div className="flex gap-2 items-center">
          <span className="text-xs text-gray-500">
            {wordCount} word{wordCount !== 1 ? "s" : ""}
          </span>
          <button
            onClick={handleClear}
            className="text-xs text-blue-500 hover:text-blue-700 transition"
          >
            Clear
          </button>
        </div>
      </div>
      <textarea
        id="text"
        className="border border-gray-300 rounded-md p-3 w-full focus:outline-none 
        focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        rows="4"
        placeholder="Enter text here..."
        value={value}
        onChange={handleChange}
      ></textarea>
      <div className="mt-1 text-xs text-gray-500">
        Press Ctrl+Enter to generate speech
      </div>
    </div>
  );
};

export default TextEditor;

