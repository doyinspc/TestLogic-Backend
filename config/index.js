const mysql = require("mysql");
//MYSQL CREATED AND CONNECTED

// var mysql= mysql.createPool({
//     connectionLimit: 100,
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'elimstaff'
// })
var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'cbt'
});

mysqlConnection.connect((err)=>{
    if(!err){
        console.log('Database Connected');
    }else{
        console.log(`Database Connection Failed ${JSON.stringify(err, undefined, 2)}`);
    }
})



module.exports = mysqlConnection;




