const  { THEMES } =  require('./types');
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
const build_param_active = utility.build_param_active;
const concats = utility.concat_where_and;


const TABLE = THEMES;
//GET A PARTICULAR CATEGORY
router.get(`/cat/:${TABLE[1]}`, (req, res)=>{
    let param = req.params;
    let completeQuery = build_param(param)
    const sql = `SELECT *  FROM ${ TABLE[0] } ${ completeQuery }`; 
    request(sql, res);
})

//GET A MULTIPLE IDS
router.get(`/mult/:${TABLE[1]}`, (req, res)=>{
    let param = build_in_param(TABLE[1], req.params);
    let completeQuery = concats(param)
    const sql = `SELECT *  FROM ${ TABLE[0] } ${ completeQuery }`;
    request(sql, res);
})

//GET A MULTIPLE CLOUD
router.get(`/cloud/:${TABLE[1]}`, (req, res)=>{
    let param = build_param_active(TABLE[1], req.params);
    const sql = `SELECT *  FROM ${ TABLE[0] } ${ param }`;
    request(sql, res);
})

//GET A SECIFIC ROW
router.get(`/:id`, (req, res)=>{
    let param = req.params;
    let completeQuery = build_param(param)
    const sql = `SELECT *  FROM ${ TABLE[0] } ${ completeQuery }`;
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