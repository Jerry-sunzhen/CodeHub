const jwt=require("jsonwebtoken")
const {PRIVATE_KEY}=require("../app/config")
class LoginController{
  async login(ctx,next){
    const {username,id}=ctx.request.body

    const token=jwt.sign({username,id},PRIVATE_KEY,{
      expiresIn: 60*60*12,
      algorithm:"RS256"
    })

    ctx.body={
      username,
      id,
      token
    }

  }



}


module.exports=new LoginController()