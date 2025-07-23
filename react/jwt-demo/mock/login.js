import jwt from "jsonwebtoken";
const { sign } = jwt;
// 安全性 编码的时候加密
// 解码的时候用于解密
const secret = "!&1244jajf";
// login 模块 mock
export default [
  {
    url: "/api/login",
    method: "post",
    timeout: 2000, // 请求耗时
    response: (req, res) => {
      // req,username,password
      const { username, password } = req.body;
      if (username !== "admin" || password !== "123456") {
        return {
          code: 1,
          message: "用户名或密码错误",
        };
      }
      // json 用户数据
      const token = sign(
        {
          user: {
            id: "001",
            username: "admin",
          },
        },
        secret,
        { expiresIn: 86400 }
      );
      console.log(token, "-----");
      // 生成token 颁发令牌
      return {
        token,
        username,
        password,
      };
    },
  },
  {
    url: "/api/user",
    method: "get",
    response: (req, res) => {
      // 用户端 token headers
      const token = req.headers["authorization"];
      try {
        const decode = jwt.decode(token, secret);
        console.log(decode);
        return {
          code: 0,
          data: decode.user,
          message: "获取用户信息成功",
        };
      } catch (err) {
        return {
          code: 1,
          message: "Invalid token",
        };
      }
      return {
        token,
      };
    },
  },
];
