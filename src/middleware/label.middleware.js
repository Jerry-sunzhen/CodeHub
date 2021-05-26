const {createLabel,searchLabelByName}=require("../service/label.server")

//如果label中不存在request.body.labels中的标签,就在label中添加
class LabelMiddleware{
  async verifyLabelExists(ctx,next) {
    const {labels} = ctx.request.body
    for (let label of labels) {
      const [[result]] = await searchLabelByName(label)
      if (result === undefined) {
        await createLabel(label)
      }
    }

    await next()
  }
}

module.exports=new LabelMiddleware()