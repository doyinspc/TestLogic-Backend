const mysql = require("mysql");
require('dotenv').config({
    path: `../env-files/${process.env.NODE_ENV || 'development'}.env`,
  });
  console.log(process.env.NODE_ENV)
var mysqlConnection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME
});

mysqlConnection.connect((err)=>{
    if(!err){
        console.log(`Database Connected to -- ${process.env.DATABASE_PASSWORD} ${process.env.DATABASE_NAME} ${process.env.DATABASE_USER} ${process.env.DATABASE_HOST}`);
    }else{
        console.log(`Database Connection Failed ${JSON.stringify(err.sqlMessage, undefined, 2)}`);
    }
})

module.exports = mysqlConnection;




