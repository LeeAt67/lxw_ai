import { useState, createElement } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "标题一" },
    { id: 2, title: "标题二" },
    { id: 3, title: "标题三" },
  ]);
  // 背后调用 createElement 方法
  const element = <h1 className="title">hello,world</h1>;
  // 手动调用 createElement 方法
  const element2 = createElement(
    "h1",
    { className: "title", id: "tit" },
    "hello,world"
  );
  return (
    <>
    <ul>
      {
          todos.map((todo) => {
            return <li key={todo.id}>{todo.title}</li>;
          })
        }
      </ul>

      <ul>
        {
          todos.map((todo)=>{
            return createElement('li',{key:todo.id},todo.title)
          })
        }
      </ul>
      {element}
      {element2}
    </>
  );
}

export default App;
