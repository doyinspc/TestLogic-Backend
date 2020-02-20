const  { MOCKS } =  require('./types');
const router = require('express').Router();
const utility = require('./utility');

const build_param = utility.build_param;
const insert_param = utility.insert_param;
const request = utility.request_param;
const request_insert = utility.request_insert_id;
const request_update = utility.request_update;
const request_delete = utility.request_delete;
const update_param = utility.update_param;
const build_in_param = utility.build_in_param;
const concats = utility.concat_where_and;


const TABLE = MOCKS;
//GET A PARTICULAR CATEGORY
router.get(`/cat/:${TABLE[1]}`, (req, res)=>{
    let param = req.params;
    let completeQuery = build_param(param)
    const sql = `SELECT *  FROM ${ TABLE[0] } ${ completeQuery }`; 
    console.log(sql)
    request(sql, res);
})

//GET A MULTIPLE IDS
router.patch(`/mult/:${TABLE[1]}`, (req, res)=>{
    console.log(req.body);
    if(req.body && req.body && Object.keys(req.body).length > 0 )
    {
        let param = build_in_param(req.body[TABLE[1]], TABLE[1]);
        const sql = `SELECT * FROM ${TABLE[0]} WHERE ${param}`;
        console.log(sql)
        request(sql, res);
    }
})

//GET A SECIFIC ROW
router.get(`/:id`, (req, res)=>{
    let param = req.params;
    let completeQuery = build_param(param)
    const sql = `SELECT *  FROM ${ TABLE[0] } ${ completeQuery }`;
    request(sql, res);
})

//GET A MULTIPLE CLOUD
router.get(`/cloud/:${TABLE[1]}`, (req, res)=>{
    //let id = res.params.mockID;
    const sql = `SELECT * FROM mocks JOIN themes ON mocks.themeID = themes.id WHERE themes.subjectID = 1`;
    console.log(sql);
    request(sql, res);
})

//ADD A ROW
router.post(`/register`, (req, res)=>{
    let completeQuery = insert_param(req.body);
    if(completeQuery)
    {
        const sql = `INSERT INTO ${ TABLE[0] } ${ completeQuery[0] } VALUES ${ completeQuery[1] }`;
        request_insert(sql, res);
    }
})
//EDIT A ROW
router.patch(`/update/:id`, (req, res)=>{
    let param = build_param(req.params);
    let id = req.params.id;
    let completeQuery = update_param(req.body);
    const sql = `UPDATE ${ TABLE[0] } SET ${ completeQuery } ${ param }`;
    const sqlr = `SELECT * FROM ${TABLE[0]} WHERE id = ${id}`;
    request_update(sql, sqlr, res);
})
//DELETE A ROW
router.delete(`/:id`, (req, res)=>{
    let completeQuery = build_param(param);
    if(completeQuery)
    {
        const sql = `DELETE FROM ${ TABLE[0] } ${ completeQuery}`;
        request_delete(req.params.id, sql, res);
    }
})

module.exports = router;