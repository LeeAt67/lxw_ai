import { useState, useEffect } from "react";
import "./App.css";
import { getTodos, getRepos } from "@/api";

function App() {
  const [todos, setTodos] = useState([]);
  const [repos, setRepos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      //  const todosResult = await getTodos();
      //  console.log(todosResult);
      //  setTodos(todosResult.data.data);

      const reposResult = await getRepos();
      console.log(reposResult);
      setRepos(reposResult.data);
    };
    fetchData();
  }, []);
  return (
    <>
      {console.log("repos:", repos)}
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            {repo.name} {repo.description}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
