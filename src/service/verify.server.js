const connectionPool=require("../app/database")

class VerifyServer{
  async searchResource(tableName,tableId,id){
    const statement=`
    SELECT * FROM ${tableName} WHERE id=? AND user_id=?
    `
    const [result]=await connectionPool.execute(statement,[tableId,id])
    return result.length!==0
  }

}

module.exports=new VerifyServer()