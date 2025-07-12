/**
 * View层 - 用户界面显示
 * 职责：展示数据、接收用户输入、格式化输出
 */

class UserView {
  constructor() {
    // 获取DOM元素
    this.userForm = document.getElementById("userForm");
    this.userList = document.getElementById("userList");
    this.userDetail = document.getElementById("userDetail");
    this.formMessage = document.getElementById("formMessage");
    this.clearBtn = document.getElementById("clearBtn");
  }

  /**
   * 显示用户列表
   * @param {Array} users 用户数组
   */
  displayUsers(users) {
    if (!users || users.length === 0) {
      this.userList.innerHTML =
        '<li style="color: #666; font-style: italic;">暂无用户数据</li>';
      return;
    }

    this.userList.innerHTML = users
      .map(
        (user) => `
            <li data-user-id="${user.id}">
                <strong>${user.name}</strong> - ${user.email} (${user.age}岁)
                <button onclick="app.controller.deleteUser(${user.id})" 
                        style="float: right; background: #dc3545; padding: 2px 8px; font-size: 12px;">
                    删除
                </button>
            </li>
        `
      )
      .join("");

    // 添加点击事件监听器
    this.userList.querySelectorAll("li").forEach((li) => {
      li.addEventListener("click", (e) => {
        // 避免删除按钮触发详情显示
        if (e.target.tagName !== "BUTTON") {
          const userId = li.dataset.userId;
          app.controller.showUserDetail(userId);
        }
      });
    });
  }

  /**
   * 显示用户详情
   * @param {Object} user 用户对象
   */
  displayUserDetail(user) {
    if (!user) {
      this.userDetail.innerHTML = '<p style="color: #666;">用户不存在</p>';
      return;
    }

    this.userDetail.innerHTML = `
            <h4>用户详情</h4>
            <p><strong>ID:</strong> ${user.id}</p>
            <p><strong>姓名:</strong> ${user.name}</p>
            <p><strong>邮箱:</strong> ${user.email}</p>
            <p><strong>年龄:</strong> ${user.age}岁</p>
            <button onclick="app.controller.editUser(${user.id})" 
                    style="background: #28a745; margin-top: 10px;">
                编辑用户
            </button>
        `;
  }

  /**
   * 显示表单消息
   * @param {string} message 消息内容
   * @param {string} type 消息类型 ('success' | 'error')
   */
  showFormMessage(message, type = "success") {
    this.formMessage.innerHTML = `<div class="${type}">${message}</div>`;

    // 3秒后自动清除消息
    setTimeout(() => {
      this.formMessage.innerHTML = "";
    }, 3000);
  }

  /**
   * 清空表单
   */
  clearForm() {
    this.userForm.reset();
    this.formMessage.innerHTML = "";
  }

  /**
   * 获取表单数据
   * @returns {Object} 表单数据对象
   */
  getFormData() {
    const formData = new FormData(this.userForm);
    return {
      name: formData.get("name"),
      email: formData.get("email"),
      age: formData.get("age"),
    };
  }

  /**
   * 填充表单数据（用于编辑）
   * @param {Object} user 用户数据
   */
  fillFormData(user) {
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("age").value = user.age;
  }

  /**
   * 显示编辑模式
   * @param {Object} user 用户数据
   */
  showEditMode(user) {
    this.fillFormData(user);

    // 更改按钮文本
    const submitBtn = this.userForm.querySelector('button[type="submit"]');
    submitBtn.textContent = "更新用户";
    submitBtn.dataset.editMode = "true";
    submitBtn.dataset.editId = user.id;

    this.showFormMessage("编辑模式：请修改用户信息", "success");
  }

  /**
   * 退出编辑模式
   */
  exitEditMode() {
    this.clearForm();

    // 恢复按钮文本
    const submitBtn = this.userForm.querySelector('button[type="submit"]');
    submitBtn.textContent = "添加用户";
    delete submitBtn.dataset.editMode;
    delete submitBtn.dataset.editId;
  }

  /**
   * 显示加载状态
   * @param {boolean} isLoading 是否正在加载
   */
  showLoading(isLoading) {
    const submitBtn = this.userForm.querySelector('button[type="submit"]');
    if (isLoading) {
      submitBtn.textContent = "处理中...";
      submitBtn.disabled = true;
    } else {
      submitBtn.textContent = submitBtn.dataset.editMode
        ? "更新用户"
        : "添加用户";
      submitBtn.disabled = false;
    }
  }

  /**
   * 高亮显示选中的用户
   * @param {number} userId 用户ID
   */
  highlightSelectedUser(userId) {
    // 移除所有高亮
    this.userList.querySelectorAll("li").forEach((li) => {
      li.style.backgroundColor = "";
    });

    // 高亮选中的用户
    const selectedLi = this.userList.querySelector(
      `li[data-user-id="${userId}"]`
    );
    if (selectedLi) {
      selectedLi.style.backgroundColor = "#e3f2fd";
    }
  }

  /**
   * 显示用户统计信息
   * @param {Object} stats 统计信息
   */
  displayStats(stats) {
    const statsHtml = `
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 20px;">
                <h4>用户统计</h4>
                <p><strong>总用户数:</strong> ${stats.total}</p>
                <p><strong>平均年龄:</strong> ${stats.averageAge}岁</p>
                <p><strong>年龄分布:</strong></p>
                <ul>
                    <li>青年 (30岁以下): ${stats.ageGroups.young}人</li>
                    <li>中年 (30-50岁): ${stats.ageGroups.middle}人</li>
                    <li>老年 (50岁以上): ${stats.ageGroups.senior}人</li>
                </ul>
            </div>
        `;

    // 在用户列表后插入统计信息
    const statsContainer =
      document.getElementById("statsContainer") ||
      (() => {
        const div = document.createElement("div");
        div.id = "statsContainer";
        this.userList.parentNode.appendChild(div);
        return div;
      })();

    statsContainer.innerHTML = statsHtml;
  }

  /**
   * 显示搜索框
   */
  showSearchBox() {
    const searchHtml = `
            <div style="margin-bottom: 15px;">
                <input type="text" id="searchInput" placeholder="搜索用户..." 
                       style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
            </div>
        `;

    // 在用户列表前插入搜索框
    if (!document.getElementById("searchInput")) {
      this.userList.insertAdjacentHTML("beforebegin", searchHtml);

      // 添加搜索事件监听器
      document.getElementById("searchInput").addEventListener("input", (e) => {
        app.controller.searchUsers(e.target.value);
      });
    }
  }

  /**
   * 显示错误信息
   * @param {string} error 错误信息
   */
  showError(error) {
    console.error("View Error:", error);
    this.showFormMessage(`错误: ${error}`, "error");
  }
}
