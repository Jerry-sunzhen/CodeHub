
const {createMoment,
  searchMomentById,
  searchMomentList,
  patchMoment,
  removeMoment}=require("../service/moment.server")

const {searchLabelByName,createMoment_Label,isMoment_LabelExists}=require("../service/label.server")

class MomentController{
  async createMoment(ctx,next) {
    const {id} = ctx.user
    const {content} = ctx.request.body
    const result = await createMoment(content, id)
    if (result) {
      ctx.body = '添加动态成功'
    }
  }

  async searchMomentById(ctx,next){
    const {momentId}=ctx.params
    ctx.body=await searchMomentById(momentId)
  }

  async searchMomentList(ctx, next){
    const {offset,size}=ctx.query
    ctx.body= await searchMomentList(offset,size)
  }
  async patchMoment(ctx,next) {
    const {momentId} = ctx.params
    const {content} = ctx.request.body
    await patchMoment(momentId, content)
    ctx.body="修改动态成功"

  }
  async removeMoment(ctx,next){
    const {momentId}=ctx.params
    await removeMoment(momentId)
    ctx.body="删除动态成功"
  }

  async createMomentLabels(ctx,next) {
    const {labels} = ctx.request.body
    const {momentId}=ctx.params
    for (let label of labels) {
      const [[{id}]] = await searchLabelByName(label)
      if(!await isMoment_LabelExists(momentId,id)){
        await createMoment_Label(momentId,id)
      }
    }
    ctx.body="创建成功"
  }
}

module.exports=new MomentController()