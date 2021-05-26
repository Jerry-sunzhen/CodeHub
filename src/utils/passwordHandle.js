const crypto=require("crypto")

module.exports=function md5Password(password){
     const result=crypto
       .createHash("md5")
       .update(password)
       .digest("hex")
    return result
 }



