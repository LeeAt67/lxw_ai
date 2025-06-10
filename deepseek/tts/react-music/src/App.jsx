import { useState, useRef } from 'react'
import './App.css'

function App() {
  // react use 开头 ref hook 获取 DOM 元素
  const audioPlayer = useRef(null);
  console.log(audioPlayer, "///");
  const playMusic = () => {
    // console.log(audioPlayer, "+++");
    console.log("play music");
    audioPlayer.current.play();
  }
  return (
    <>
      <audio ref={audioPlayer} src="/sounds/snare.wav"></audio>
      <button onClick={playMusic}>播放</button>
    </>
  )
}

export default App
