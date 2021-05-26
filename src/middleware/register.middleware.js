const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USERNAME_ALREADY_EXISTS
}=require('../constants/errorTypes')
const {getUserByName}=require("../service/user.service")
const md5Password=require('../utils/passwordHandle')

class RegisterMiddleware {
  async verifyUser(ctx, next) {
    //获取用户名及密码
    const {username, password} = ctx.request.body

    //判断用户名及密码是否为空
    if (username.trim() === "" || password.trim() === "") {
      const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED)
      return ctx.app.emit("error", error, ctx)
    }

    //判断用户名是否已存在
    const result = await getUserByName(username)
    const user = result[0]

    if (user) {
      const error = new Error(USERNAME_ALREADY_EXISTS)
      return ctx.app.emit("error", error, ctx)
    }
    await next()
  }

  async handlePassword(ctx, next) {
    const {password} = ctx.request.body
    ctx.request.body.password = md5Password(password)
    await next()
  }
}

module.exports=new RegisterMiddleware()



