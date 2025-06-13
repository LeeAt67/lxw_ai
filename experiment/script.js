// 游戏初始化
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const leaderboardElement = document.getElementById('leaderboard');
const splitBtn = document.getElementById('splitBtn');
const shootBtn = document.getElementById('shootBtn');

// 设置画布大小为窗口大小
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 游戏参数
const MAP_SIZE = 3000;
const PLAYER_RADIUS = 10;
const FOOD_COUNT = 200;  // 减少食物数量以提升性能
const AI_COUNT = 10;  // 减少AI数量以提升性能
const FOOD_RADIUS = 3;

// 游戏对象
let player = {
    x: MAP_SIZE / 2,
    y: MAP_SIZE / 2,
    radius: PLAYER_RADIUS,
    color: getRandomColor(),
    name: '大雪梨',  // 修改玩家名称为大雪梨
    mass: PLAYER_RADIUS * PLAYER_RADIUS,
    speed: 2,
    dx: 0,
    dy: 0
};

let foods = [];
let aiPlayers = [];
let bullets = [];
let cameraOffset = { x: 0, y: 0 };
let keys = {};
let mouse = { x: 0, y: 0 };

// 初始化游戏
function init() {
    // 生成食物
    for (let i = 0; i < FOOD_COUNT; i++) {
        foods.push({
            x: Math.random() * MAP_SIZE,
            y: Math.random() * MAP_SIZE,
            radius: FOOD_RADIUS,
            color: getRandomColor()
        });
    }

    // 生成AI玩家
    for (let i = 0; i < AI_COUNT; i++) {
        aiPlayers.push({
            x: Math.random() * MAP_SIZE,
            y: Math.random() * MAP_SIZE,
            radius: PLAYER_RADIUS + Math.random() * 15,
            color: getRandomColor(),
            name: '雪梨' + (Math.floor(Math.random() * 100) + 1),  // 修改AI名称为雪梨1-100随机
            mass: 0,
            dx: Math.random() * 2 - 1,
            dy: Math.random() * 2 - 1
        });
    }

    // 事件监听
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    splitBtn.addEventListener('click', handleSplit);
    shootBtn.addEventListener('click', handleShoot);

    // 开始游戏循环
    gameLoop();
}

// 游戏主循环
let frameCount = 0;
function gameLoop() {
    frameCount++;
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// 更新游戏状态
function update() {
    // 更新玩家位置
    if (keys['w'] || keys['ArrowUp']) player.y -= player.speed;
    if (keys['s'] || keys['ArrowDown']) player.y += player.speed;
    if (keys['a'] || keys['ArrowLeft']) player.x -= player.speed;
    if (keys['d'] || keys['ArrowRight']) player.x += player.speed;

    // 边界检查
    player.x = Math.max(player.radius, Math.min(MAP_SIZE - player.radius, player.x));
    player.y = Math.max(player.radius, Math.min(MAP_SIZE - player.radius, player.y));

    // 更新相机位置
    cameraOffset.x = player.x - canvas.width / 2;
    cameraOffset.y = player.y - canvas.height / 2;

    // 更新AI玩家
    aiPlayers.forEach(ai => {
        // 简单AI移动逻辑
        ai.x += ai.dx;
        ai.y += ai.dy;

        // 边界检查和反弹
        if (ai.x <= ai.radius || ai.x >= MAP_SIZE - ai.radius) ai.dx *= -1;
        if (ai.y <= ai.radius || ai.y >= MAP_SIZE - ai.radius) ai.dy *= -1;

        // 随机改变方向
        if (Math.random() < 0.02) {
            ai.dx = Math.random() * 2 - 1;
            ai.dy = Math.random() * 2 - 1;
        }
    });

    // 优化后的碰撞检测，减少检测频率
    if (frameCount % 3 === 0) {
        checkCollisions();
    }

    // 更新分数
    player.mass = player.radius * player.radius;
    scoreElement.textContent = Math.floor(player.mass);

    // 更新排行榜
    updateLeaderboard();
}

// 渲染游戏
// 在文件开头添加
const pearImage = new Image();
pearImage.src = 'pear.png';

// 修改render函数中的绘制玩家部分
// 在全局变量部分添加
let showControlHint = true;
let gameStartTime = 0;

// 在init函数中添加
gameStartTime = Date.now();

// 在render函数中添加提示绘制
function render() {
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 保存当前状态
    ctx.save();
    
    // 应用相机偏移
    ctx.translate(-cameraOffset.x, -cameraOffset.y);

    // 绘制食物
    foods.forEach(food => {
        ctx.beginPath();
        ctx.arc(food.x, food.y, food.radius, 0, Math.PI * 2);
        ctx.fillStyle = food.color;
        ctx.fill();
    });

    // 绘制AI玩家
    aiPlayers.forEach(ai => {
        ctx.beginPath();
        ctx.arc(ai.x, ai.y, ai.radius, 0, Math.PI * 2);
        ctx.fillStyle = ai.color;
        ctx.fill();

        // 绘制AI名字
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(ai.name, ai.x, ai.y - ai.radius - 5);
    });

    // 绘制玩家（雪梨图案）
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.drawImage(pearImage, -player.radius, -player.radius, player.radius*2, player.radius*2);
    ctx.restore();
    
    // 绘制玩家名字
    ctx.fillStyle = '#000';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(player.name, player.x, player.y - player.radius - 8);

    // 恢复状态
    ctx.restore();
    
    // 绘制WSAD控制提示（5秒后消失）
    if (showControlHint && Date.now() - gameStartTime < 5000) {
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(20, 20, 150, 40);
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.fillText('WSAD控制方向哦', 30, 45);
        ctx.fillText('如果你想一键缩小请按空格键', 60, 90);
        ctx.restore();
    } else {
        showControlHint = false;
    }
}

// 碰撞检测
function checkCollisions() {
    // 玩家吃食物
    for (let i = foods.length - 1; i >= 0; i--) {
        const food = foods[i];
        const dist = Math.sqrt(
            Math.pow(player.x - food.x, 2) + 
            Math.pow(player.y - food.y, 2)
        );

        if (dist < player.radius + food.radius) {
            // 增加玩家大小
            player.radius += food.radius * 0.1;
            // 移除食物
            foods.splice(i, 1);
            // 添加新食物
            foods.push({
                x: Math.random() * MAP_SIZE,
                y: Math.random() * MAP_SIZE,
                radius: FOOD_RADIUS,
                color: getRandomColor()
            });
        }
    }

    // 玩家吃AI
    for (let i = aiPlayers.length - 1; i >= 0; i--) {
        const ai = aiPlayers[i];
        const dist = Math.sqrt(
            Math.pow(player.x - ai.x, 2) + 
            Math.pow(player.y - ai.y, 2)
        );

        if (dist < player.radius + ai.radius && player.radius > ai.radius * 1.1) {
            // 增加玩家大小
            player.radius += ai.radius * 0.2;
            // 移除AI
            aiPlayers.splice(i, 1);
            // 添加新AI
            aiPlayers.push({
                x: Math.random() * MAP_SIZE,
                y: Math.random() * MAP_SIZE,
                radius: PLAYER_RADIUS + Math.random() * 10,
                color: getRandomColor(),
                name: 'AI-' + (aiPlayers.length + 1),
                mass: 0,
                dx: Math.random() * 2 - 1,
                dy: Math.random() * 2 - 1
            });
        }
    }
}

// 更新排行榜
function updateLeaderboard() {
    // 创建所有玩家列表
    const allPlayers = [player, ...aiPlayers];
    
    // 按质量排序
    allPlayers.sort((a, b) => b.mass - a.mass);
    
    // 清空排行榜
    leaderboardElement.innerHTML = '';
    
    // 显示前5名
    for (let i = 0; i < Math.min(5, allPlayers.length); i++) {
        const li = document.createElement('li');
        li.textContent = `${allPlayers[i].name}: ${Math.floor(allPlayers[i].mass)}`;
        leaderboardElement.appendChild(li);
    }
}

// 分裂功能
// 简化分裂功能
function handleSplit() {
    // 只分裂一次，不创建新球体
    player.radius *= 0.7;
    player.speed *= 1.2; // 增加速度作为补偿
}

// 删除简化吐球功能
function handleShoot() {
    // 完全移除吐球功能
}

// 事件处理函数
function handleKeyDown(e) {
    keys[e.key.toLowerCase()] = true;
    
    // 空格键分裂
    if (e.key === ' ') handleSplit();
    // O键吐球
    if (e.key.toLowerCase() === 'o') handleShoot();
}

function handleKeyUp(e) {
    keys[e.key.toLowerCase()] = false;
}

function handleMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

// 辅助函数
function getRandomColor() {
    const colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 启动游戏
// 在init函数前添加
const startScreen = document.getElementById('gameCanvas');
init();