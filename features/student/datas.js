const mysql = require('../../config/index.js');
const router = require('express').Router()

const API = '/api';
const TABLE = 'datas';


request = (sql, res) => {
    mysql.query(sql, (err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }else{
            res.send(`Database Connection Failed ${JSON.stringify(err, undefined, 2)}`);
        }
    })
}

build_param = (data) => {
    let str = '';
    for(d in data)
    {
        if(str.length > 0){
            str += ' AND ';
        }
        str += ` ${ d } = "${data[d]}" `;
        console.log(str)
    }
    if(str.length > 0){
        return `where ${str}`
    }
    
}

//STUDENTS
router.get(`/`, (req, res)=>{
    let param = req.query;
    let completeQuery = build_param(param)
    const sql = `SELECT * FROM ${ TABLE} ${ completeQuery }`; 
    request(sql, res);
})

router.get(`/:id`, (req, res)=>{
    let param = req.params;
    let completeQuery = build_param(param)
    const sql = `SELECT * FROM ${ TABLE } ${ completeQuery }`;
    request(sql, res);
})
//GET CATEGORY OF ITEMS
router.get(`/cat/:sid`, (req, res)=>{
    let param = req.params;
    let completeQuery = build_param(param)
    const sql = `SELECT * FROM ${ TABLE } ${ completeQuery }`;
    request(sql, res);
})

module.exports = router;