const {searchLabelByName,createLabel,searchLabel}=require("../service/label.server")

class LabelController{
  async createLabel(ctx,next){
    try {
      const {labels} = ctx.request.body
      for (let label of labels) {
        const result = await searchLabelByName(label)
        if (!result[0].length) {
          await createLabel(label)
        }
      }
      ctx.body = "创建成功"
    }catch (e) {
      console.log(e)
    }
  }

  async searchLabel(ctx,next){
    const result = await searchLabel()
  }




}

module.exports=new LabelController()