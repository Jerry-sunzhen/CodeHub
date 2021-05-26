const {
  createComment,
  createReply,
  deleteComment,patchComment}=require("../service/comment.server")

class CommentController{
  async createComment(ctx,next){
    const {momentId,content}=ctx.request.body
    const {id}=ctx.user
    await createComment(id,momentId,content)
    ctx.body="添加评论成功"
  }
  async createReply(ctx,next){
    const {momentId,content}=ctx.request.body
    const {id}=ctx.user
    const {commentId}=ctx.params
    await createReply(id,momentId,commentId,content)
    ctx.body="添加回复成功"
  }
  async deleteComment(ctx,next){
    const {commentId}=ctx.params
    await deleteComment(commentId)
    ctx.body="删除评论成功"
  }
  async patchComment(ctx,next){
    const {content}=ctx.request.body
    const {commentId}=ctx.params
    await patchComment(commentId,content)
    ctx.body="修改评论成功"
  }

}

module.exports=new CommentController()