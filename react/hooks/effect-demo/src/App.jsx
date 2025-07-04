import {
  useState,
  useEffect
} from 'react'
import './App.css'
import Timer from './components/Timer'

function App() {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(0);
  const [repos, setRepos] = useState([]);
  const [isTimerOn, setIsTimeOn] = useState(true);
  /*console.log('函数开始执行');
  // 正作用？渲染组件 
  // 渲染完组件后搞点副作用
  // 生命周期函数 挂载后 mounted

  useEffect(() => {
    console.log('组件渲染完了');
  })
  // 生命周期的更新
  // 第二个参数是依赖项数组
  useEffect(() => {
    console.log('hahaha');
  }, [count]);
  useEffect(() => {
    console.log('123');
  }, [num]);
  useEffect(() => {
    console.log('678');
  }, [num, count]);
*/
  useEffect(() => {
    // api 数据 动态的
    console.log('只在组件挂载时运行一次!!');
    const fetchRepos = async () => {
      const response = await fetch('https://api.github.com/users/LeeAt67/repos');
      const data = await response.json();
      console.log(data);
      setRepos(data);
    }
    fetchRepos();
  }, []);
  // 组件的模板编译
  // 挂载到#root节点上

  console.log('组件的模板编译');
  return (
    <>
      {count}
      <button onClick={() => setCount(count + 1)}>点我</button>
      <br />
      {num}
      <button onClick={() => setNum(num + 1)}>点我</button>
      <ul id='repos'>
        {
          repos.map(repo => <li key={repo.id}>{repo.full_name}</li>)
        }
      </ul>

      {isTimerOn && <Timer />}

      <button onClick={() => {
        setIsTimeOn(!isTimerOn)
      }}>toggle timer</button>
    </>
  )
}

export default App
