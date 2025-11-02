import { useState, useRef, useEffect } from "react";
import LoadingOverlay from "./components/LoadingOverlay";
import TextEditor from "./components/TextEditor";
import AudioControls from "./components/AudioControls";
import HistoryPanel from "./components/HistoryPanel";
import SettingsPanel from "./components/SettingsPanel";
import { SPEAKERS, DEFAULT_SPEAKER } from "./constants";
import { useKeyboardShortcut, shortcuts } from "./utils/keyboardShortcuts";
import { validateText, handleWorkerError } from "./utils/errorHandler";

function App() {
  // 界面状态
  // llm ready 大模型准备好了不？
  const [ready, setReady] = useState(null);
  // 按钮点击 防止多次点击
  const [disabled, setDisabled] = useState(false);
  // 进度条数组
  const [progressItems, setProgressItems] = useState([]);
  // 表单文本
  const [text, setText] = useState("I love Hugging Face!");
  // 音色
  const [selectedSpeaker, setSelectedSpeaker] = useState(DEFAULT_SPEAKER);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    autoPlay: false,
    showNotifications: true,
  });

  const worker = useRef(null);
  useEffect(() => {
    // 引入 transformer
    // http://localhost:5173/worker.js
    worker.current = new Worker(new URL("./worker.js", import.meta.url), {
      type: "module",
    });

    const onMessageReceived = (e) => {
      // console.log(e, '来自主线程');
      switch (e.data.status) {
        case "initiate":
          // llm ready 了吗？
          setReady(false);
          setProgressItems((prev) => [...prev, e.data]);
          break;
        case "progress":
          // console.log(e.data)
          setProgressItems((prev) =>
            prev.map((item) => {
              if (item.file === e.data.file) {
                return {
                  ...item,
                  progress: e.data.progress,
                };
              }
              return item;
            })
          );
          break;
        case "done":
          setProgressItems((prev) =>
            prev.filter((item) => item.file !== e.data.file)
          );
          break;
        case "ready":
          setReady(true);
          break;
        case "complete":
          setDisabled(false);
          setError(null);
          const blobUrl = URL.createObjectURL(e.data.output);
          // console.log(blobUrl);
          setOutput(blobUrl);
          break;
        case "error":
          handleWorkerError(e.data.error, setError, setDisabled);
          break;
      }
    };
    worker.current.onmessage = onMessageReceived;

    worker.current.onerror = (error) => {
      console.error("Worker error:", error);
      handleWorkerError(error, setError, setDisabled);
    };

    return () => {
      if (worker.current) {
        worker.current.terminate();
      }
    };
  }, []);

  const handleGenerateSpeech = () => {
    try {
      validateText(text);
      setDisabled(true);
      setError(null);
      worker.current.postMessage({
        text,
        speaker_id: selectedSpeaker,
      });
    } catch (error) {
      setError(error.message);
      setDisabled(false);
    }
  };

  // 键盘快捷键
  useKeyboardShortcut(shortcuts.GENERATE, handleGenerateSpeech, !disabled);

  // 历史记录选择
  const handleHistorySelect = (item) => {
    setText(item.text);
    setOutput(item.audioUrl);
    setShowHistory(false);
  };

  // 下载音频
  const handleDownload = (audioUrl) => {
    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = `tts-speech-${Date.now()}.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const isLoading = ready === false;

  return (
    <div className="min-h-screen flex justify-center items-start bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      {/* llm 初始化 */}
      <LoadingOverlay isLoading={isLoading} progressItems={progressItems} />
      
      {/* tts 功能区 */}
      <div className="bg-white p-8 rounded-xl w-full max-w-2xl m-2 shadow-xl">
        {/* 标题区域 */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            In browser Text To Speech
          </h1>
          <p className="text-sm text-gray-600">
            Made with <span className="font-semibold">Transformer.js</span>
          </p>
        </div>

        {/* 文本编辑器 */}
        <TextEditor
          value={text}
          onChange={(e) => setText(e.target.value)}
          onClear={() => setError(null)}
        />

        {/* 音色选择 */}
        <div className="mb-4">
          <label htmlFor="speaker" className="block text-sm font-medium text-gray-600 mb-2">
            Voice Speaker
          </label>
          <select
            id="speaker"
            className="border border-gray-300 rounded-md p-3 w-full 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={selectedSpeaker}
            onChange={(e) => setSelectedSpeaker(e.target.value)}
          >
            {
              Object.entries(SPEAKERS).map(([key, value]) => (
                <option key={key} value={value}>
                  {key}
                </option>
              ))
            }
          </select>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-red-700">{error}</span>
            </div>
          </div>
        )}

        {/* 生成按钮 */}
        <div className="flex gap-3 mb-4">
          <button
            className={`flex-1 py-3 px-6 rounded-md font-medium transition
            ${
              disabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
            } text-white shadow-md`}
            onClick={handleGenerateSpeech}
            disabled={disabled}
          >
            {disabled ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              "Generate Speech"
            )}
          </button>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`px-4 py-3 rounded-md transition ${
              showHistory 
                ? "bg-blue-100 text-blue-600" 
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
            }`}
            title="History"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`px-4 py-3 rounded-md transition ${
              showSettings 
                ? "bg-blue-100 text-blue-600" 
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
            }`}
            title="Settings"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* 音频播放器 */}
        {output && (
          <AudioControls
            audioUrl={output}
            mimeType="audio/wav"
            onDownload={handleDownload}
          />
        )}

        {/* 历史记录面板 */}
        <HistoryPanel
          audioUrl={output}
          text={text}
          onSelect={handleHistorySelect}
          isVisible={showHistory}
        />

        {/* 设置面板 */}
        <SettingsPanel
          onSettingsChange={setSettings}
          isVisible={showSettings}
        />
      </div>
    </div>
  );
}

export default App;
