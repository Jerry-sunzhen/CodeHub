//用户注册路由

const Router=require('koa-router')
const {create}=require('../controller/register.controller')
const registerRouter=new Router({
  prefix:'/register'
})

const {verifyUser,handlePassword}=require('../middleware/register.middleware')

//利用中间件对密码进行加密
registerRouter.post('/',verifyUser,handlePassword,create)

module.exports=registerRouter