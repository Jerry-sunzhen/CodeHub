const mysql=require("mysql2")
const {MYSQL_HOST,MYSQL_PORT,MYSQL_DATABASE,MYSQL_CONNECTION_LIMIT,MYSQL_USER,MYSQL_PASSWORD}=require('./config')


const connectionPool=mysql.createPool({
  host:MYSQL_HOST,
  port:MYSQL_PORT,
  database:MYSQL_DATABASE,
  connectionLimit:MYSQL_CONNECTION_LIMIT,
  user:MYSQL_USER,
  password:MYSQL_PASSWORD,
})

module.exports=connectionPool.promise()