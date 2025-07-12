/**
 * 应用入口文件 - 初始化MVC架构
 * 负责创建和连接Model、View、Controller
 */

// 全局应用对象
window.app = {};

// 应用初始化函数
function initApp() {
  try {
    console.log("正在初始化MVC应用...");

    // 创建Model实例
    const userModel = new UserModel();
    console.log("Model层初始化完成");

    // 创建View实例
    const userView = new UserView();
    console.log("View层初始化完成");

    // 创建Controller实例，并传入Model和View
    const userController = new UserController(userModel, userView);
    console.log("Controller层初始化完成");

    // 将实例保存到全局应用对象中
    app.model = userModel;
    app.view = userView;
    app.controller = userController;

    // 初始化应用
    app.controller.init();

    // 添加一些额外的功能按钮
    addExtraFeatures();

    console.log("MVC应用启动成功！");

    // 显示欢迎信息
    setTimeout(() => {
      app.view.showFormMessage("欢迎使用MVC架构的用户管理系统！", "success");
    }, 1000);
  } catch (error) {
    console.error("应用初始化失败:", error);
    alert("应用初始化失败: " + error.message);
  }
}

/**
 * 添加额外功能
 */
function addExtraFeatures() {
  // 在页面顶部添加功能按钮
  const container = document.querySelector(".container");
  const extraFeaturesHtml = `
        <div class="section" style="text-align: center; margin-bottom: 20px;">
            <h3>额外功能</h3>
            <button onclick="app.controller.exportUserData()" 
                    style="background: #17a2b8; margin: 5px;">
                导出用户数据
            </button>
            <button onclick="showMVCInfo()" 
                    style="background: #6c757d; margin: 5px;">
                查看MVC说明
            </button>
            <button onclick="resetData()" 
                    style="background: #ffc107; color: #000; margin: 5px;">
                重置数据
            </button>
        </div>
    `;

  container.insertAdjacentHTML("afterbegin", extraFeaturesHtml);
}

/**
 * 显示MVC架构信息
 */
function showMVCInfo() {
  const info = `
        <div style="background: #e9ecef; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h4>MVC架构说明</h4>
            <p><strong>Model (模型):</strong></p>
            <ul>
                <li>处理数据和业务逻辑</li>
                <li>数据验证和存储</li>
                <li>与数据库交互</li>
                <li>独立于用户界面</li>
            </ul>
            
            <p><strong>View (视图):</strong></p>
            <ul>
                <li>负责用户界面显示</li>
                <li>接收用户输入</li>
                <li>格式化数据输出</li>
                <li>不包含业务逻辑</li>
            </ul>
            
            <p><strong>Controller (控制器):</strong></p>
            <ul>
                <li>处理用户请求</li>
                <li>协调Model和View</li>
                <li>处理用户交互逻辑</li>
                <li>作为Model和View的中介</li>
            </ul>
            
            <p><strong>数据流向:</strong></p>
            <p>用户操作 → Controller → Model → 数据库</p>
            <p>用户界面 ← View ← Controller ← Model</p>
        </div>
    `;

  // 在页面中显示信息
  const infoContainer =
    document.getElementById("mvcInfo") ||
    (() => {
      const div = document.createElement("div");
      div.id = "mvcInfo";
      document.querySelector(".container").appendChild(div);
      return div;
    })();

  infoContainer.innerHTML = info;

  // 3秒后自动隐藏
  setTimeout(() => {
    infoContainer.innerHTML = "";
  }, 10000);
}

/**
 * 重置数据
 */
function resetData() {
  if (confirm("确定要重置所有用户数据吗？这将删除所有用户信息。")) {
    try {
      // 重新创建Model实例（重置数据）
      app.model = new UserModel();

      // 重新创建Controller实例
      app.controller = new UserController(app.model, app.view);

      // 刷新显示
      app.controller.refreshUserList();

      app.view.showFormMessage("数据已重置为初始状态！", "success");
      console.log("数据重置完成");
    } catch (error) {
      app.view.showError("重置失败: " + error.message);
    }
  }
}

/**
 * 演示MVC数据流
 */
function demonstrateMVCFlow() {
  console.log("=== MVC数据流演示 ===");

  // 1. 用户操作（模拟）
  console.log("1. 用户点击添加用户按钮");

  // 2. Controller接收请求
  console.log("2. Controller接收用户请求");

  // 3. Controller调用Model
  console.log("3. Controller调用Model处理业务逻辑");

  // 4. Model处理数据
  console.log("4. Model验证数据并存储");

  // 5. Model返回结果给Controller
  console.log("5. Model返回处理结果给Controller");

  // 6. Controller选择View
  console.log("6. Controller选择View显示结果");

  // 7. View更新界面
  console.log("7. View更新用户界面");

  console.log("=== 演示完成 ===");
}

// 页面加载完成后初始化应用
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM加载完成，开始初始化应用...");
  initApp();

  // 添加键盘快捷键
  document.addEventListener("keydown", function (e) {
    // Ctrl + S: 导出数据
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      app.controller.exportUserData();
    }

    // Ctrl + R: 重置数据
    if (e.ctrlKey && e.key === "r") {
      e.preventDefault();
      resetData();
    }

    // Ctrl + H: 显示MVC信息
    if (e.ctrlKey && e.key === "h") {
      e.preventDefault();
      showMVCInfo();
    }
  });

  // 添加控制台命令
  window.demonstrateMVC = demonstrateMVCFlow;
  window.showMVCInfo = showMVCInfo;
  window.resetData = resetData;

  console.log("应用初始化完成！");
  console.log("可用命令:");
  console.log("- demonstrateMVC(): 演示MVC数据流");
  console.log("- showMVCInfo(): 显示MVC说明");
  console.log("- resetData(): 重置数据");
  console.log("快捷键:");
  console.log("- Ctrl + S: 导出数据");
  console.log("- Ctrl + R: 重置数据");
  console.log("- Ctrl + H: 显示MVC信息");
});

// 错误处理
window.addEventListener("error", function (e) {
  console.error("应用错误:", e.error);
  if (app.view) {
    app.view.showError("应用发生错误: " + e.error.message);
  }
});

// 未处理的Promise拒绝
window.addEventListener("unhandledrejection", function (e) {
  console.error("未处理的Promise拒绝:", e.reason);
  if (app.view) {
    app.view.showError("异步操作失败: " + e.reason);
  }
});
