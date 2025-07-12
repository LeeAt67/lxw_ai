/**
 * Model层 - 数据模型和业务逻辑
 * 职责：处理数据访问、业务规则验证、数据处理
 */

class UserModel {
  constructor() {
    // 模拟数据库存储
    this.users = [
      { id: 1, name: "张三", email: "zhangsan@example.com", age: 25 },
      { id: 2, name: "李四", email: "lisi@example.com", age: 30 },
      { id: 3, name: "王五", email: "wangwu@example.com", age: 28 },
    ];
    this.nextId = 4;
  }

  /**
   * 获取所有用户
   * @returns {Array} 用户列表
   */
  getAllUsers() {
    return [...this.users]; // 返回副本，避免直接修改原数据
  }

  /**
   * 根据ID获取用户
   * @param {number} id 用户ID
   * @returns {Object|null} 用户对象或null
   */
  getUserById(id) {
    return this.users.find((user) => user.id === parseInt(id)) || null;
  }

  /**
   * 添加新用户
   * @param {Object} userData 用户数据
   * @returns {Object} 添加的用户对象
   */
  addUser(userData) {
    // 业务规则验证
    if (!this.validateUserData(userData)) {
      throw new Error("用户数据验证失败");
    }

    // 检查邮箱是否已存在
    if (this.isEmailExists(userData.email)) {
      throw new Error("邮箱已存在");
    }

    const newUser = {
      id: this.nextId++,
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      age: parseInt(userData.age),
    };

    this.users.push(newUser);
    return newUser;
  }

  /**
   * 删除用户
   * @param {number} id 用户ID
   * @returns {boolean} 是否删除成功
   */
  deleteUser(id) {
    const index = this.users.findIndex((user) => user.id === parseInt(id));
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * 更新用户信息
   * @param {number} id 用户ID
   * @param {Object} userData 更新的用户数据
   * @returns {Object|null} 更新后的用户对象
   */
  updateUser(id, userData) {
    const user = this.getUserById(id);
    if (!user) {
      return null;
    }

    // 验证更新数据
    if (userData.email && this.isEmailExists(userData.email, id)) {
      throw new Error("邮箱已存在");
    }

    // 更新用户信息
    Object.assign(user, {
      name: userData.name || user.name,
      email: userData.email || user.email,
      age: userData.age ? parseInt(userData.age) : user.age,
    });

    return user;
  }

  /**
   * 验证用户数据
   * @param {Object} userData 用户数据
   * @returns {boolean} 验证结果
   */
  validateUserData(userData) {
    if (!userData.name || userData.name.trim().length < 2) {
      return false;
    }

    if (!userData.email || !this.isValidEmail(userData.email)) {
      return false;
    }

    if (
      !userData.age ||
      isNaN(userData.age) ||
      userData.age < 1 ||
      userData.age > 120
    ) {
      return false;
    }

    return true;
  }

  /**
   * 验证邮箱格式
   * @param {string} email 邮箱地址
   * @returns {boolean} 验证结果
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * 检查邮箱是否已存在
   * @param {string} email 邮箱地址
   * @param {number} excludeId 排除的用户ID（用于更新时检查）
   * @returns {boolean} 是否存在
   */
  isEmailExists(email, excludeId = null) {
    return this.users.some(
      (user) => user.email === email.toLowerCase() && user.id !== excludeId
    );
  }

  /**
   * 搜索用户
   * @param {string} keyword 搜索关键词
   * @returns {Array} 搜索结果
   */
  searchUsers(keyword) {
    if (!keyword || keyword.trim() === "") {
      return this.getAllUsers();
    }

    const searchTerm = keyword.toLowerCase().trim();
    return this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * 获取用户统计信息
   * @returns {Object} 统计信息
   */
  getUserStats() {
    const total = this.users.length;
    const avgAge =
      total > 0
        ? Math.round(
            this.users.reduce((sum, user) => sum + user.age, 0) / total
          )
        : 0;

    return {
      total,
      averageAge: avgAge,
      ageGroups: {
        young: this.users.filter((user) => user.age < 30).length,
        middle: this.users.filter((user) => user.age >= 30 && user.age < 50)
          .length,
        senior: this.users.filter((user) => user.age >= 50).length,
      },
    };
  }
}
