
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USERNAME_ALREADY_EXISTS,
  USER_DOES_NOT_EXISTS,
  PASSWORD_DOES_NOT_MATCH,
  TOKEN_DOES_NOT_MATCH,
  TOKEN_DOES_NOT_EXIST,
  DO_NOT_HAVE_PERMISSION,
  MOMENT_DO_NOT_EXIST
}=require('../constants/errorTypes')


const errorHandler=(err,ctx)=>{
  let status,body

  //判断错误类型,并对status及body进行赋值
  switch (err.message){
    case NAME_OR_PASSWORD_IS_REQUIRED:
      status=400  //bad request(参数出现错误)
      body=NAME_OR_PASSWORD_IS_REQUIRED
      break
    case USERNAME_ALREADY_EXISTS:
      status=409 //conflict(产生冲突)
      body=USERNAME_ALREADY_EXISTS
      break
    case USER_DOES_NOT_EXISTS:
      status=400
      body=USER_DOES_NOT_EXISTS
      break
    case PASSWORD_DOES_NOT_MATCH:
      status=400
      body=PASSWORD_DOES_NOT_MATCH
      break
    case TOKEN_DOES_NOT_MATCH:
      status=401  //unauthorized
      body=TOKEN_DOES_NOT_MATCH
      break
    case TOKEN_DOES_NOT_EXIST:
      status= 401
      body=TOKEN_DOES_NOT_EXIST
      break
    case DO_NOT_HAVE_PERMISSION:
      status=403
      body=DO_NOT_HAVE_PERMISSION
      break
    case MOMENT_DO_NOT_EXIST:
      status=400
      body=MOMENT_DO_NOT_EXIST
      break
    default:
      status=404
      body="NOT FOUND"

  }

//将status和body赋值给ctx
  ctx.status=status
  ctx.body=body
}

module.exports=errorHandler