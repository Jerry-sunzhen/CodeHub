//该文件只负责将路由作为中间件挂载到app实例上
const Koa=require("koa")
const app=new Koa()
const bodyParser=require('koa-bodyparser')

const allRoutes=require("../router")
const errorHandler=require('./errorHandle')
const cors=require("koa2-cors")

//使用bodyparser解析request中发送的json信息
app.use(bodyParser())

//允许服务器跨域
app.use(cors())
//将router文件夹中所有的routes全部注册
allRoutes(app)

//错误处理
app.on("error",errorHandler)

module.exports=app