const Router=require("koa-router")
const labelRouter=new Router({prefix:"/label"})

const {verifyToken}=require("../middleware/verify.middleware")

const {createLabel,searchLabel}=require("../controller/label.controller")

labelRouter.post("/",verifyToken,createLabel)

labelRouter.get("/",searchLabel)


module.exports=labelRouter