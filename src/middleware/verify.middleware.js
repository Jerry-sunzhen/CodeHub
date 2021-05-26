const jwt=require("jsonwebtoken")

const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_DOES_NOT_EXISTS,
  PASSWORD_DOES_NOT_MATCH,
  TOKEN_DOES_NOT_EXIST,
  TOKEN_DOES_NOT_MATCH,
  DO_NOT_HAVE_PERMISSION,
  MOMENT_DO_NOT_EXIST,
  COMMENT_DO_NOT_EXIST
}=require('../constants/errorTypes')
const {getUserByName}=require("../service/user.service")
const md5Password=require("../utils/passwordHandle")

const {PUBLIC_KEY}=require('../app/config')
const {searchResource}=require('../service/verify.server')
class VerifyMiddleware{

  //将输入账号密码与数据库进行对比
  async verifyLogin(ctx,next){
    const {username,password}=ctx.request.body
    //注意：每一次判断之后需要return，这样就不会继续执行next

    //判断账号密码是否为空
    if(username.trim()==="" || password.trim()===""){
      const error=new Error(NAME_OR_PASSWORD_IS_REQUIRED)
      return ctx.app.emit("error",error,ctx)
    }
    const result=await getUserByName(username)
    const user=result[0]


    if(!user) {
      const error = new Error(USER_DOES_NOT_EXISTS)
      return ctx.app.emit("error", error, ctx)
    }

    const handlePassword=md5Password(password)

    if(handlePassword!==user.password) {
      const error = new Error(PASSWORD_DOES_NOT_MATCH)
      return ctx.app.emit("error", error, ctx)
    }

    ctx.request.body=user
    await next()

  }

  //检验用户是否登录(是否已经有token存在)
  async verifyToken(ctx,next){
    const auth=ctx.header.authorization
    if(!auth){
      const error=new Error(TOKEN_DOES_NOT_EXIST)
      return ctx.app.emit("error",error,ctx)
    }
    try{
      const token=auth.replace("Bearer ","")
      const result=jwt.verify(token,PUBLIC_KEY,{
        algorithms:["RS256"]
      })
      ctx.user=result
      await next()
    }catch(err){
      console.log(err)
      const error=new Error(TOKEN_DOES_NOT_MATCH)
      return ctx.app.emit("error",error,ctx)
    }
  }

  //检验登录的用户是否有操作资源的权限
  async verifyResourcePermission(ctx,next){
    const {id}=ctx.user
    const key=Object.keys(ctx.params)[0]
    const tableName=key.replace("Id","")
    const tableId=ctx.params[key]
    const result=await searchResource(tableName,tableId,id)
    if(!result){
      const error=new Error(DO_NOT_HAVE_PERMISSION)
      return ctx.app.emit("error",error,ctx)
    }
    await  next()
  }

}


module.exports=new VerifyMiddleware()