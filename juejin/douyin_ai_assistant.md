 # 豆包AI助手接入教程

## 目录
1. [项目概述](#项目概述)
2. [前期准备](#前期准备)
3. [项目搭建](#项目搭建)
4. [代码实现](#代码实现)
5. [AI提示词设置](#AI提示词设置)

## 项目概述
本教程将指导您如何创建一个基于豆包API的AI助手对话窗口。这个AI助手将具有温柔和蔼的语气，能够详细地为用户解答问题。

## 前期准备
1. 注册豆包开发者账号
   - 访问豆包开放平台：https://www.doubao.com/
   - 完成开发者认证
   - 获取API密钥（API Key）

2. 环境要求
   - Node.js 14.0+
   - npm 或 yarn
   - 现代浏览器

## 项目搭建

### 1. 创建项目
```bash
# 创建新项目目录
mkdir ai-assistant
cd ai-assistant

# 初始化项目
npm init -y

# 安装必要依赖
npm install express axios dotenv cors
```

### 2. 项目结构
```
ai-assistant/
├── .env                 # 环境变量配置
├── package.json         # 项目配置
├── server.js           # 后端服务
├── public/             # 前端静态文件
    ├── index.html      # 主页面
    ├── style.css       # 样式文件
    └── script.js       # 前端脚本
```

## 代码实现

### 1. 环境变量配置 (.env)
```
DOUBAO_API_KEY=你的豆包API密钥
```

### 2. 后端实现 (server.js)
```javascript
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const DOUBAO_API_URL = 'https://api.doubao.com/v1/chat/completions';

app.post('/chat', async (req, res) => {
    try {
        const response = await axios.post(DOUBAO_API_URL, {
            messages: [
                {
                    role: "system",
                    content: "你是67的AI助手，性格温柔和蔼，喜欢循序渐进地解答问题。对于每个问题，你都会详细地分步骤进行讲解，确保用户能够完全理解。"
                },
                {
                    role: "user",
                    content: req.body.message
                }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.DOUBAO_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

### 3. 前端实现 (public/index.html)
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>67的AI助手</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="chat-container">
        <div class="chat-header">
            <h1>67的AI助手</h1>
        </div>
        <div class="chat-messages" id="chatMessages"></div>
        <div class="chat-input">
            <textarea id="userInput" placeholder="请输入您的问题..."></textarea>
            <button id="sendButton">发送</button>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### 4. 样式实现 (public/style.css)
```css
body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #f0f2f5;
}

.chat-container {
    max-width: 800px;
    margin: 20px auto;
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.chat-header {
    padding: 20px;
    background: #4a90e2;
    color: white;
    border-radius: 10px 10px 0 0;
    text-align: center;
}

.chat-messages {
    height: 500px;
    overflow-y: auto;
    padding: 20px;
}

.message {
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 8px;
}

.user-message {
    background: #e3f2fd;
    margin-left: 20%;
}

.ai-message {
    background: #f5f5f5;
    margin-right: 20%;
}

.chat-input {
    padding: 20px;
    border-top: 1px solid #eee;
    display: flex;
    gap: 10px;
}

textarea {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    resize: none;
    height: 60px;
}

button {
    padding: 10px 20px;
    background: #4a90e2;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background: #357abd;
}
```

### 5. 前端脚本 (public/script.js)
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        messageDiv.textContent = content;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        addMessage(message, true);
        userInput.value = '';

        try {
            const response = await fetch('http://localhost:3000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            addMessage(data.choices[0].message.content);
        } catch (error) {
            addMessage('抱歉，出现了一些错误，请稍后再试。');
        }
    }

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
});
```

## AI提示词设置

为了让AI助手具有温柔和蔼的语气，并能够详细地解答问题，我们在后端代码中设置了系统提示词：

```javascript
{
    role: "system",
    content: "你是67的AI助手，性格温柔和蔼，喜欢循序渐进地解答问题。对于每个问题，你都会详细地分步骤进行讲解，确保用户能够完全理解。"
}
```

这个提示词设定了AI助手的以下特点：
1. 身份定位：67的专属AI助手
2. 性格特征：温柔和蔼
3. 回答方式：循序渐进，详细分步
4. 沟通目标：确保用户完全理解

## 运行项目

1. 安装依赖：
```bash
npm install
```

2. 启动服务器：
```bash
node server.js
```

3. 访问应用：
打开浏览器，访问 http://localhost:3000

## 注意事项
1. 请确保在使用前已经正确配置了豆包API密钥
2. 建议在生产环境中添加适当的错误处理和安全措施
3. 可以根据需要调整AI提示词，使其更符合特定场景的需求
