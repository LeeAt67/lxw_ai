# react repos 项目开发

- api.github.io/users/LeeAt67/repos
- 综合 react 开发全家桶、项目级别、大型的、性能

- todos
- 从 demo 开始

- login

## 路由设计

- react-router-demo
- /repos/:username
- /repos/:id
  懒加载
  hash/history
  （路由守卫）
  useParams :username

## 数据管理

App 数据管理
repos
useContent + useReducer + hooks
createContext + reducer + useRepos

## react

组件的粒度

## api

fetch

- axios http 请求库
- 独立的模块，所有请求会从组件中分离到 api 目录下

## 项目目录结构，项目架构

- api
  应用中的所有结构
- main.jsx
  入口文件
  添加路由，SPA
  添加全局应用状态管理

- RepoList 功能模块
  - params 解析
    - useParams 动态参数对象
    - 不要放到 useEffect 里面
    - 校验 id
      不要相信用户的任何提交
    - navigate('/') -> useEffect 中去
- 组件开发模式
  - UI 组件（JSX）
  - 自定义 hooks useRepos 方便
  - 状态管理 应用全局 context 来管
    - repos loading error => context value
  - useReducer reducer 函数
