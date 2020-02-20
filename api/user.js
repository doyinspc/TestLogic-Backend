const  { USERS } =  require('./types');
const router = require('express').Router();
const utility = require('./utility');

const build_param = utility.build_param;
const insert_param = utility.insert_param;
const request = utility.request_param;
const request_insert = utility.request_insert_id;
const request_update = utility.request_update;
const request_user = utility.request_user;
const request_delete = utility.request_delete;
const update_param = utility.update_param;


const TABLE = USERS;
//GET A PARTICULAR CATEGORY
router.get(`/`, (req, res)=>{
    let param = req.params;
    let completeQuery = build_param(param)
    const sql = `SELECT *  FROM ${ TABLE } ${ completeQuery }`; 
    request(sql, res);
})
//GET A SECIFIC ROW
router.get(`/:id`, (req, res)=>{
    let param = req.params;
    let completeQuery = build_param(param)
    const sql = `SELECT *  FROM ${ TABLE } ${ completeQuery }`;
    request(sql, res);
})
//ADD A ROW
router.post(`/register`, (req, res)=>{
    let completeQuery = insert_param(req.body);
    if(completeQuery)
    {
        const sql = `INSERT INTO ${ TABLE } ${ completeQuery[0] } VALUES ${ completeQuery[1] }`;
        request_insert(sql, res);
    }
})

//EDIT A ROW
router.patch(`/post/:id`, (req, res)=>{
    let param = build_param(req.params);
    let id = req.params.id;
    let completeQuery = insert_param(req.body.user);
    const sqlin = `INSERT INTO ${ TABLE } ${ completeQuery[0] } VALUES ${ completeQuery[1] }`;
    const sql = `SELECT * FROM ${TABLE} WHERE id = ${id}`;
    
    request_user(sql, sqlin, res);
})

//EDIT A ROW
router.patch(`/update/:id`, (req, res)=>{
    let param = build_param(req.params);
    let id = req.params.id;
    let completeQuery = update_param(req.body);
    const sql = `UPDATE ${ TABLE } SET ${ completeQuery } ${ param }`;
    const sqlr = `SELECT * FROM ${TABLE} WHERE id = ${id}`;
    request_update(sql, sqlr, res);
})


//DELETE A ROW
router.delete(`/:id`, (req, res)=>{
    let completeQuery = build_param(param);
    if(completeQuery)
    {
        const sql = `DELETE FROM ${ TABLE } ${ completeQuery}`;
        request_delete(req.params.id, sql, res);
    }
})

module.exports = router;