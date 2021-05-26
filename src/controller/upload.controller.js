const {createAvatar,searchAvatarByUserId,addAvatarToUser}=require("../service/upload.service")
const fs=require('fs')

class UploadController{
  async createAvatar(ctx,next){
    const {mimetype,size,filename} =ctx.req.file
    const {id}=ctx.user
    await createAvatar(id,mimetype,filename,size)
    const avatar_url=`localhost:8000/user/${id}/avatar`
    await addAvatarToUser(avatar_url,id)

  }

  async searchAvatarByUserId(ctx,next){
    const {userId}=ctx.params
    const result=await searchAvatarByUserId(userId)
    console.log(result)
    ctx.response.set("content-type",result.mimetype)
    ctx.body=fs.createReadStream(`./uploads/${result.filename}`)

  }

}

module.exports=new UploadController()