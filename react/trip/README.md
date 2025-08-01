# react 旅游 APP

ReadMe.md 很重要 方便面试官

- 移动 App
- 模仿 App
  - 喜欢的、国外的
  - 有点改变
- 绝大多数的考点
  - 都适用于任何 App

## 技术栈

- React 全家桶

  - React 组件开发
    组件的封装
    第三方组件库
    受控和非受控组件
    hooks 编程 自定义 hooks

  - React-Router-DOM
    SPA
    路由守卫
    懒加载
  - Zustand

- Mock 接口模拟
- axios 请求拦截和代理
- jwt 登录
- module CSS
- vite 配置
- 性能优化
  防抖节流
  useCallback useMemo ....
- css 预处理器 stylus
  flex transition transform。。。
- LLM
  - chat
  - 生图
  - 语音
  - coze 工作流 调用
  - 流式输出
- 移动端适配
  rem
- 单例模式 设计模式的理解
- git 提交等编程风格

## 项目的架构

- components
- pages
- stores
- hooks
- api
- mock

## 开发前的准备

- 安装的包
  react-router-dom zustand axios
  react-vant(UI 组件库) lib-flexible（移动端适配）
  开发期间的依赖
  vite-plugin-mock jwt

- vite 配置
  - alias
  - mock
  - .env.local
    llm apiKey
  - user-scalable
  - css 预处理
    index.css reset
    box-sizing font-family:-apply-system
    App.css 全局通用样式
    module.css 模块化样式
  - 移动端的适配 rem
    不能用 px，相对单位 rem html
    不同设备上体验要一致
    不同尺寸手机 等比例缩放
    设计师设计稿 750px iphone 4 375pt \* 2 = 750
    小米
    CSS 一行代码 手机的不同尺寸 html font-size 等比例
    layout
    flexible.js 阿里 在任何设备上
    1rem = 屏幕宽度/10
- lib-flexible
  阿里开源
  设置 html fontSize = window.
  innerWidth / 10
  css px 宽度 = 手机设备宽度 = 375
  1px = 2 发光源
  750px 设计稿

- 设计稿上一个盒子的大小？
  - 1 像素不差的还原设计稿
  - 设计稿中像素单位
  - /75

## 项目亮点

- 移动端适配
  - lib-flexible 1rem = 屏幕宽度/10
  - 设计稿 尺寸是 iphone 标准尺寸 750px
  - 前端的职责是还原设计稿
  - 频繁的单位 260/75 换算
  - 自动化？
    postcss + postcss-pxtorem
    postcss 是 css 与编译器，很强大
    vite 自动读取 postcss.config.js 将 css 内容编译
    px -> rem

## git 提交规范

- 项目初始化

## 功能模块

- UI 组件库
  - react-vant 第三方组件库 70%的组件已经有了，不用写
  - 选择一个适合业务的组件库 或者公司内部的组件库
- 配置路由及懒加载

  - 懒加载
  - 路由守卫
  - Layout 组件
    - 嵌套路由 Outlet 分组路由配置
    - 网页有几个模板 Layout
      - Route 不加 path 对应的路由自动选择
      - tabbar 模板
      - blank 模板
  - tabbar
    - react-vant + @react-vant/icons
    - value + onChange 响应式
    - 直接点击链接分享 active 的设置

- chatbot 模块
  - llm 模块 chat 封装
  - 迭代 chat ， 支持任意模型
- Search
  - 防抖
  - api
    GoogleSuggest
  - localStorage
- 瀑布流
  - 小红书等主流 App 的内容浏览用户体验产品
    两列、图片高度不一致、落差感
    滚动加载更多，图片懒加载
  - 接口
    /api/images?page=${n} 支持翻页
    唯一 id page + index
    随即图片，高度随机
  - images 怎么放到两列中？ MVVM
    数据驱动界面（2 列） 奇偶
  - 加载更多 位于盒子底部的元素 通过使用 intersectionObserver
    观察了是否出现在视窗，性能更好，使用了观察者模式
    组件卸载时，直接使用 disconnect 释放资源，防止内存泄漏
  - key id 下拉刷新
  - 使用 IntersectionObserver 再次图片懒加载 data-src
- toast 组件封装
  - 需要自定义，UI 组件库不满足需求
  - UI props
  - JS 显示出来 跨层级通信
    观察者
  - mitt eventBus 事件总线
    - 实例化 mitt()
    - on(自定义事件的名字。callback)
    - emit（自定义事件的名字，参数）
      组件通过监听一个自定义事件,实现基于事件的组件通信

## 项目亮点和难点

- 前端智能

  - chat 函数
  - 对各家模型比较感兴趣， 升级为 kimiChat,doubaoChat.. 灵活
    性能、能力、性价比
    随意切换大模型，通过参数抽象
  - 文生图
    - 优化 prompt 设计，

- 原子 css

  - App.css 里面添加通用样式
  - 各自模块里 module.css 不影响别的组件
  - lib-flexible 移动端适配
  - postcss pxtorem 插件 快速还原设计稿
  - 原子类的 css，
    一个元素按功能逻辑拆分成多个类，和原子一样
    元素的样式就可以由这些原子类组合而成
    样式复用的更好，以后几乎可以不用写样式

  - 智能生成图片

    - 产品
      冰球社群的宠物运动员 智能出图
      社交属性

      - 商业价值
        技术服务
        coze 工作流 智能编排 AI 流程 编程一种
      - api 调用

    - 设计工作流
      - 创建工作流 ani_pic
        上传宠物照片，生成宠物曲棍球运动员照片
      - 代码节点
        参数校验和逻辑功能，返回运行的结果
      - 图片生成流程
        - 图片理解插件 计算机视觉
        - 大模型 特征提取
          prompt
    - workflow_id
    - token
    - coze 图片要先上传到 coze 中
      uploadUrl + token + new FormData
      append(file)  
       拿到 file_id
    - workflowUrl + workflow_id + token
      工作流需要的参数

- 用户体验优化
  - 搜索建议，防抖+useMemo 性能优化
  - 组件粒度划分
    React.memo + useCallback
  - 懒加载
  - 热门推荐 + 相关商品（产品）
  - SPA
  - 骨架屏 不用让用户等待了
  - 文件上传的 preview html5 FileReader

## 项目遇到过什么问题，怎么解决的

- 在 chat messages 中 遇到 message 覆盖问题
- 闭包陷阱问题
  一次事件里面，两次 setMessages()
- 升级瀑布流？

  - 骨架屏
  - 奇偶 images 两列分配可能有时候像天蚕脚一样，不好看，随机嘛
    两个响应式数组，判断哪一列高度更少，将新得到的 img 加入那个数组
  - intersectionObserver 用的两次，重复了，dry 原则 封装？
    hooks

- 自定义 Hooks

  - useTitle
    一定要设置

- es6 特性使用
  tabbar 的高亮

  - arr.findIndex
  - str.startsWith
  - promise
    瀑布流随机数据生成
  - Array.from({length:pageSize},(\_,i)=>({
    }))

- 项目迭代
  - 功能由浅入深
  - chatbot deepseek chat
  - deepseek-r1 推理模型
  - 流式输出
  - 上下文
  - coze 工作流接口调用

## 通用组件开发

- Loading
  - 居中方案 position fixed + tlrb0 + margin:auto
  - React.memo 无状态的组件，不重新渲染
  - animation
  -
