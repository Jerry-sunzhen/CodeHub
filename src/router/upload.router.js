const Router=require("koa-router")


const uploadRouter=new Router({prefix:"/upload"})
const {verifyToken}=require("../middleware/verify.middleware")
const {avatarHandle}=require("../middleware/upload.middleware")
const {createAvatar}=require("../controller/upload.controller")

uploadRouter.post("/avatar",verifyToken,avatarHandle,createAvatar)

module.exports=uploadRouter