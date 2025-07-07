import { useState } from "react";
import "./App.css";
import Todos from "./components/Todos";

function App() {
  return (
    <>
      {/* 开发的任务单位就是组件 */}
      {/* <div style={{ fontSize: "12px", width: "8.3333333em", height: "8.3333333em", background: "green" }}></div>
      <div style={{ fontSize: "14px", width: "3.571428em", height: "3.571428em", background: "green" }}></div> */}
      
      <Todos />
    </>
  );
}

export default App;
