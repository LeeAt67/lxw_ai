/**
 * Controller层 - 控制器
 * 职责：处理用户请求、协调Model和View、处理用户交互逻辑
 */

class UserController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.currentUser = null;
    this.isEditMode = false;

    // 绑定事件处理器
    this.bindEvents();
  }

  /**
   * 绑定事件处理器
   */
  bindEvents() {
    // 表单提交事件
    this.view.userForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });

    // 清空表单事件
    this.view.clearBtn.addEventListener("click", () => {
      this.clearForm();
    });
  }

  /**
   * 处理表单提交
   */
  handleFormSubmit() {
    try {
      this.view.showLoading(true);

      const formData = this.view.getFormData();
      const submitBtn = this.view.userForm.querySelector(
        'button[type="submit"]'
      );

      if (submitBtn.dataset.editMode) {
        // 编辑模式
        const userId = parseInt(submitBtn.dataset.editId);
        this.updateUser(userId, formData);
      } else {
        // 添加模式
        this.addUser(formData);
      }
    } catch (error) {
      this.view.showError(error.message);
    } finally {
      this.view.showLoading(false);
    }
  }

  /**
   * 添加用户
   * @param {Object} userData 用户数据
   */
  addUser(userData) {
    try {
      // 调用Model处理业务逻辑
      const newUser = this.model.addUser(userData);

      // 更新View显示
      this.refreshUserList();
      this.view.showFormMessage(`用户 "${newUser.name}" 添加成功！`);
      this.view.clearForm();

      console.log("用户添加成功:", newUser);
    } catch (error) {
      this.view.showError(error.message);
      throw error;
    }
  }

  /**
   * 更新用户
   * @param {number} userId 用户ID
   * @param {Object} userData 更新的用户数据
   */
  updateUser(userId, userData) {
    try {
      // 调用Model处理业务逻辑
      const updatedUser = this.model.updateUser(userId, userData);

      if (!updatedUser) {
        throw new Error("用户不存在");
      }

      // 更新View显示
      this.refreshUserList();
      this.view.displayUserDetail(updatedUser);
      this.view.showFormMessage(`用户 "${updatedUser.name}" 更新成功！`);
      this.exitEditMode();

      console.log("用户更新成功:", updatedUser);
    } catch (error) {
      this.view.showError(error.message);
      throw error;
    }
  }

  /**
   * 删除用户
   * @param {number} userId 用户ID
   */
  deleteUser(userId) {
    if (!confirm("确定要删除这个用户吗？")) {
      return;
    }

    try {
      // 调用Model处理业务逻辑
      const success = this.model.deleteUser(userId);

      if (!success) {
        throw new Error("用户不存在或删除失败");
      }

      // 更新View显示
      this.refreshUserList();
      this.view.displayUserDetail(null);
      this.view.showFormMessage("用户删除成功！");

      // 如果删除的是当前编辑的用户，退出编辑模式
      const submitBtn = this.view.userForm.querySelector(
        'button[type="submit"]'
      );
      if (submitBtn.dataset.editId == userId) {
        this.exitEditMode();
      }

      console.log("用户删除成功, ID:", userId);
    } catch (error) {
      this.view.showError(error.message);
    }
  }

  /**
   * 显示用户详情
   * @param {number} userId 用户ID
   */
  showUserDetail(userId) {
    try {
      // 调用Model获取用户数据
      const user = this.model.getUserById(userId);

      // 更新View显示
      this.view.displayUserDetail(user);
      this.view.highlightSelectedUser(userId);
      this.currentUser = user;

      console.log("显示用户详情:", user);
    } catch (error) {
      this.view.showError(error.message);
    }
  }

  /**
   * 编辑用户
   * @param {number} userId 用户ID
   */
  editUser(userId) {
    try {
      // 调用Model获取用户数据
      const user = this.model.getUserById(userId);

      if (!user) {
        throw new Error("用户不存在");
      }

      // 更新View显示编辑模式
      this.view.showEditMode(user);
      this.isEditMode = true;
      this.currentUser = user;

      console.log("进入编辑模式:", user);
    } catch (error) {
      this.view.showError(error.message);
    }
  }

  /**
   * 退出编辑模式
   */
  exitEditMode() {
    this.view.exitEditMode();
    this.isEditMode = false;
    this.currentUser = null;
    console.log("退出编辑模式");
  }

  /**
   * 清空表单
   */
  clearForm() {
    this.view.clearForm();
    if (this.isEditMode) {
      this.exitEditMode();
    }
  }

  /**
   * 搜索用户
   * @param {string} keyword 搜索关键词
   */
  searchUsers(keyword) {
    try {
      // 调用Model进行搜索
      const searchResults = this.model.searchUsers(keyword);

      // 更新View显示搜索结果
      this.view.displayUsers(searchResults);

      if (keyword.trim()) {
        console.log(`搜索关键词 "${keyword}" 的结果:`, searchResults);
      }
    } catch (error) {
      this.view.showError(error.message);
    }
  }

  /**
   * 刷新用户列表
   */
  refreshUserList() {
    try {
      // 调用Model获取最新数据
      const users = this.model.getAllUsers();

      // 更新View显示
      this.view.displayUsers(users);

      // 显示统计信息
      const stats = this.model.getUserStats();
      this.view.displayStats(stats);

      console.log("用户列表已刷新, 总数:", users.length);
    } catch (error) {
      this.view.showError(error.message);
    }
  }

  /**
   * 初始化应用
   */
  init() {
    try {
      // 显示搜索框
      this.view.showSearchBox();

      // 刷新用户列表
      this.refreshUserList();

      console.log("MVC应用初始化完成");
    } catch (error) {
      this.view.showError(error.message);
    }
  }

  /**
   * 获取当前用户
   * @returns {Object|null} 当前用户对象
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * 检查是否处于编辑模式
   * @returns {boolean} 是否处于编辑模式
   */
  isInEditMode() {
    return this.isEditMode;
  }

  /**
   * 获取用户统计信息
   * @returns {Object} 统计信息
   */
  getUserStats() {
    return this.model.getUserStats();
  }

  /**
   * 验证用户数据
   * @param {Object} userData 用户数据
   * @returns {boolean} 验证结果
   */
  validateUserData(userData) {
    return this.model.validateUserData(userData);
  }

  /**
   * 导出用户数据
   * @returns {string} JSON格式的用户数据
   */
  exportUserData() {
    try {
      const users = this.model.getAllUsers();
      const dataStr = JSON.stringify(users, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(dataBlob);
      link.download = `users_${new Date().toISOString().split("T")[0]}.json`;
      link.click();

      this.view.showFormMessage("用户数据导出成功！");
      console.log("用户数据导出成功");
    } catch (error) {
      this.view.showError("导出失败: " + error.message);
    }
  }
}
