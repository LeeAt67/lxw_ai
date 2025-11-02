// 音频播放控制组件 - 增强的音频控制功能
import { useEffect, useRef, useState } from "react";

const AudioControls = ({ audioUrl, mimeType, onDownload }) => {
  const audioPlayer = useRef(null);
  const audioSource = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const audio = audioPlayer.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioPlayer.current?.pause();
    } else {
      audioPlayer.current?.play();
    }
  };

  const handleProgressClick = (e) => {
    if (!audioPlayer.current || !duration) return;
    const rect = progressBarRef.current?.getBoundingClientRect();
    if (!rect) return;
    const percent = (e.clientX - rect.left) / rect.width;
    audioPlayer.current.currentTime = percent * duration;
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleDownload = () => {
    if (onDownload && audioUrl) {
      onDownload(audioUrl);
    } else if (audioUrl) {
      const a = document.createElement("a");
      a.href = audioUrl;
      a.download = `speech-${Date.now()}.wav`;
      a.click();
    }
  };

  return (
    <div className="my-4 w-full bg-white rounded-lg shadow-lg p-4">
      <audio ref={audioPlayer} className="hidden">
        <source ref={audioSource} type={mimeType} />
      </audio>

      {/* 播放控制器 */}
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={togglePlayPause}
          className="w-10 h-10 flex items-center justify-center rounded-full 
          bg-blue-500 hover:bg-blue-600 text-white transition"
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 4h4v12H6V4zm4 0h4v12h-4V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.5 4l9 6-9 6V4z" />
            </svg>
          )}
        </button>

        {/* 进度条 */}
        <div className="flex-1 flex items-center gap-2">
          <span className="text-xs text-gray-600 w-12">
            {formatTime(currentTime)}
          </span>
          <div
            ref={progressBarRef}
            onClick={handleProgressClick}
            className="flex-1 h-2 bg-gray-200 rounded-full cursor-pointer relative 
            group hover:bg-gray-300 transition"
          >
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 
              bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition"></div>
            </div>
          </div>
          <span className="text-xs text-gray-600 w-12 text-right">
            {formatTime(duration)}
          </span>
        </div>

        {/* 下载按钮 */}
        <button
          onClick={handleDownload}
          className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md 
          transition flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AudioControls;

