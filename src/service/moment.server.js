const connectionPool=require("../app/database")

class MomentServer{
  async createMoment(content,id){
    const statement=`
    INSERT INTO moment (content,user_id) VALUES (?,?) 
    `
    const result=await connectionPool.execute(statement,[content,id])
    return result[0]
  }

  async searchMomentById(momentId){
    const statement=`
      SELECT m.id id,m.content content,JSON_OBJECT("id",u.id,"name",u.username,"avatar",u.avatar_url) userInfo,
        IF(count(c.id),JSON_ARRAYAGG(JSON_OBJECT("id",c.id,"content",c.content,"commentId",c.comment_id,
        "userInfo",JSON_OBJECT("id",cu.id,"name",cu.username,"avatar",cu.avatar_url))),NULL) 
        commentList,
        IF(count(l.name),JSON_ARRAYAGG(l.name),NULL)
        labelList
      FROM moment m 
      LEFT JOIN comment c ON c.moment_id=m.id
      LEFT JOIN user u ON u.id=m.user_id
      LEFT JOIN user cu ON c.user_id=cu.id
      
      LEFT JOIN moment_label ml ON m.id=ml.moment_id
      LEFT JOIN label l ON ml.label_id=l.id
      
      GROUP BY m.id
      HAVING m.id=?
      `
    const [result]=await connectionPool.execute(statement,[momentId])
    return result[0]
  }

  async searchMomentList(offset,size){
    const statement=`
    SELECT 
      ci.id id,ci.content content ,ci.createAt createTime,JSON_OBJECT("userId",ui.id,"username",ui.username) userinfo
    FROM moment ci
    LEFT JOIN user ui
    ON ci.user_id=ui.id
    LIMIT ?,?
    `
    const [result]=await connectionPool.execute(statement,[offset, size])
    return result
  }
  async patchMoment(id,content) {
    const statement = `
    UPDATE moment SET content=? WHERE id=?
    `
    return connectionPool.execute(statement, [content, id])
  }
  async removeMoment(id){
    const statement = `
    DELETE FROM moment WHERE id=?
    `
    return connectionPool.execute(statement, [id])
  }
}


module.exports=new MomentServer()