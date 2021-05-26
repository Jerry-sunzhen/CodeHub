const connectionPool=require("../app/database")
class LabelServer{
  async createLabel(label){
    const statement=`
    INSERT INTO label (name) VALUES (?)
    `
    return connectionPool.execute(statement,[label])
  }

  async searchLabelByName(label){
    const statement=`
    SELECT * FROM label WHERE name=?
    `
    return connectionPool.execute(statement,[label])
  }

  async isMoment_LabelExists(momentId,label){
    const statement=`
      SELECT * FROM moment_label WHERE moment_id=? AND label_id=?  
    `
    const [result]=await connectionPool.execute(statement,[momentId,label])
    return result.length!==0
  }

  async createMoment_Label(momentId,label){
      const statement=`
      INSERT INTO moment_label (moment_id,label_id) VALUES (?,?)
      `
      await connectionPool.execute(statement,[momentId,label])
  }

  async searchLabel(){
    const statement=`
      
    `
  }
}

module.exports=new LabelServer()