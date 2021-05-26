const Router=require("koa-router")
const {verifyToken,verifyResourcePermission}=require("../middleware/verify.middleware")
const {verifyLabelExists}=require("../middleware/label.middleware")

const {
  createMoment,
  searchMomentList,
  searchMomentById,
  patchMoment,
  removeMoment,
  createMomentLabels}=require("../controller/moment.controller")


const momentRouter=new Router({prefix:"/moment"})


//Router可以链式调用，但是一旦中间产生错误很难找到错误源
momentRouter.post("/", verifyToken, createMoment)
momentRouter.get("/:momentId", searchMomentById)
momentRouter.get("/", searchMomentList)
momentRouter.patch("/:momentId", verifyToken, verifyResourcePermission, patchMoment)
momentRouter.delete("/:momentId", verifyToken, verifyResourcePermission, removeMoment)


//给动态添加标签接口
momentRouter.post("/:momentId/labels",verifyToken,verifyResourcePermission,verifyLabelExists,createMomentLabels)



module.exports=momentRouter

