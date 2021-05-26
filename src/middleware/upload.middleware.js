const Multer=require("koa-multer")
const path=require('path')
const storage = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    //使用path.extname可以获取文件的扩展名
    cb(null,Date.now()+path.extname(file.originalname))
  }
})

const avatarUpload=Multer({
  storage
})

class UploadMiddleware{
  avatarHandle=avatarUpload.single("avatar")


}

module.exports=new UploadMiddleware()