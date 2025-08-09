import { useState, useRef, useEffect } from "react";
import Progress from "./components/Progress";
import AudioPlayer from "./components/AudioPlayer";
import { SPEAKERS, DEFAULT_SPEAKER } from "./constants";

function App() {
  // 界面状态
  // llm ready 大模型准备好了不？
  const [ready, setReady] = useState(null);
  // 按钮点击
  const [disabled, setDisabled] = useState(false);
  // 进度条数组
  const [progressItem, setProgressItem] = useState([]);
  // 表单文本
  const [text, setText] = useState("I Love Hugging Face!");
  // 音色
  const [selectedSpeaker, setSelectedSpeaker] = useState(DEFAULT_SPEAKER);
  const [output, setOutput] = useState(null);

  const worker = useRef(null);
  useEffect(() => {
    // 引入 transformer
    // http://localhost:5173/worker.js
    worker.current = new Worker(new URL("./worker.js", import.meta.url), {
      type: "module",
    });
    worker.current.postMessage({
      text: "666666666666666666",
    });

    const onMessageReceived = () => {};
    worker.current.onmessage = onMessageReceived;

    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  }, []);
  return <div className="flex"></div>;
}

export default App;
