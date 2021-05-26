//创建用户相关方法

const connectionPool=require('../app/database')


class RegisterService{
  async create(user){
    const {username,password}=user
    const statement=`INSERT INTO user(username,password) VALUES (?,?)`
    const result=await connectionPool.execute(statement,[username,password],()=>{})
    return result[0]
  }

  async getUserByName(username){
    const statement=`SELECT * FROM user WHERE username=?`
    const result=await connectionPool.execute(statement,[username],()=>{})
    return result[0]
  }
}

module.exports=new RegisterService()