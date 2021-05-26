const dotenv=require('dotenv')
dotenv.config()
module.exports={
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_CONNECTION_LIMIT,
  MYSQL_USER,
  MYSQL_PASSWORD
}=process.env

const fs=require("fs")
const path=require("path")


module.exports.PUBLIC_KEY=fs.readFileSync(path.resolve(__dirname,"./keys/public.key"))
module.exports.PRIVATE_KEY=fs.readFileSync(path.resolve(__dirname,"./keys/private.key"))




