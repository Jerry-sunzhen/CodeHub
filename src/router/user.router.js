const Router=require("koa-router")

const userRouter=new Router({prefix:"/user"})

const {searchAvatarByUserId}=require("../controller/upload.controller")

//获取用户头像接口一般的路径为/user/:userId/avatar
userRouter.get("/:userId/avatar",searchAvatarByUserId)


module.exports=userRouter