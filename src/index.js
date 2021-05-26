//该文件只负责让app实例监听某端口号

const app=require('./app/index')
const {APP_PORT}=require('./app/config')



app.listen(APP_PORT,()=>{
  console.log(`service open on ${APP_PORT}` )
})