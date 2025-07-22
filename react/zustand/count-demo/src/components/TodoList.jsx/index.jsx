import { useTodosStore } from "../../store/todos";

const TodoList = () => {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodosStore();

  const handleAddTodo = () => {
    addTodo("打豆豆");
  };

  return (
    <div>
      <input type="text" />
      <button onClick={handleAddTodo}>添加</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
