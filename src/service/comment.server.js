const connectionPool=require("../app/database")

class CommentServer{
  async createComment(user_id,moment_id,content){
    const statement=`
    INSERT INTO comment(user_id,moment_id,content)
    VALUES(?,?,?)
    `
    const [result]=await connectionPool.execute(statement,[user_id,moment_id,content])
    return result
  }

  async createReply(user_id,moment_id,comment_id,content){
    const statement=`
    INSERT INTO comment(user_id,moment_id,comment_id,content)
    VALUES(?,?,?,?)
    `
    const [result]=await connectionPool.execute(statement,[user_id,moment_id,comment_id,content])
    return result
  }
  async searchCommentById(c_id,u_id){
    const statement=`
    SELECT * FROM comment WHERE id=? AND user_id=?
    `
    const [result]=await connectionPool.execute(statement,[c_id,u_id])
    return result.length!==0
  }
  async deleteComment(id){
    const statement=`
    DELETE FROM comment WHERE id=?
    `
    await connectionPool.execute(statement,[id])
  }
  async patchComment(id,content){
    const statement=`
    UPDATE  comment SET content=? WHERE id=?
    `
    await connectionPool.execute(statement,[content,id])
  }
}

module.exports=new CommentServer()