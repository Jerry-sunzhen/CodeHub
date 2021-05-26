const fs=require('fs')

//该文件夹只负责注册路由，路由内的逻辑全部抽离到controller文件夹中

const allRoutes=(app)=>{
  //读取当前文件夹中的文件名称,批量绑定至app
  const result=fs.readdirSync(__dirname)

  result.forEach(item=>{
      if(item==="index.js")return
      const router=require(`./${item}`)
      app.use(router.routes())
      app.use(router.allowedMethods())
      //当用户发送的请求类型是，未定义请求类型的接口会请求失败
      //一般使用koa-router在注册组件的时候都会调用该函数
  })
}

module.exports=allRoutes