const mysql = require("mysql");
require('dotenv').config({
    path: `../env-files/${process.env.NODE_ENV || 'development'}.env`,
  });
  console.log(process.env.NODE_ENV)
var mysqlConnection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    user:process.env.RDS_USERNAME,
    password:process.env.RDS_PASSWORD,
    database:process.env.RDS_DB_NAME
});

mysqlConnection.connect((err)=>{
    if(!err){
        console.log(`Database Connected to -- ${process.env.RDS_PASSWORD} ${process.env.RDS_DB_NAME} ${process.env.RDS_USERNAME} ${process.env.RDS_HOSTNAME}`);
    }else{
        console.log(`Database Connection Failed ${JSON.stringify(err.sqlMessage, undefined, 2)}`);
    }
})

module.exports = mysqlConnection;




