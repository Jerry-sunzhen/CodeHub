const connectionPool=require("../app/database")

class UploadService{
  async createAvatar(userId,mimetype,filename,size){
    const statement=`
    INSERT INTO avatar (filename,mimetype,size,user_id) VALUES (?,?,?,?)
    `
    await connectionPool.execute(statement,[filename,mimetype,size,userId])
  }
  async searchAvatarByUserId(userId){
    const statement=`
    SELECT * FROM avatar WHERE user_id=?
    `
    const [result]=await connectionPool.execute(statement,[userId])
    return result[0]
  }
  async addAvatarToUser(avatar_url,userId){
    const statement=`
    UPDATE user SET avatar_url=? WHERE id=?
    `
    await connectionPool.execute(statement,[avatar_url,userId])
  }
}


module.exports=new UploadService()