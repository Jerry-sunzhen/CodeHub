
const {create}=require('../service/user.service')

class RegisterController{
  async create(ctx,next){
    //获取用户请求传递的参数
    const user=ctx.request.body

    //查询数据库(抽取到service文件中)
    const result=await create(user)
    //返回给用户信息
    ctx.body="创建用户成功成功"

  }




}


module.exports=new RegisterController()

