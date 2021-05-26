const Router=require("koa-router")
const commentRouter=new Router({prefix:"/comment"})

const {verifyToken,verifyResourcePermission}=require("../middleware/verify.middleware")
const {
  createComment,
  createReply,
  deleteComment,
  patchComment}=require("../controller/comment.controller")

commentRouter.post("/",verifyToken,createComment)
commentRouter.post("/:commentId",verifyToken,createReply)
commentRouter.delete('/:commentId',verifyToken,verifyResourcePermission,deleteComment)
commentRouter.patch("/:commentId",verifyToken,verifyResourcePermission,patchComment)

module.exports=commentRouter