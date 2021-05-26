//登录接口
const Router=require('koa-router')
const loginRouter=new Router({prefix:"/login"})

const {login}=require("../controller/login.controller")
const {verifyLogin}=require("../middleware/verify.middleware")


loginRouter.post("/",verifyLogin,login)




module.exports=loginRouter