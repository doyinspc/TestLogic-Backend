const  { INSTRUCTIONS} =  require('./types');
const router = require('express').Router();
const utility = require('./utility');

const build_param = utility.build_param;
const insert_param = utility.insert_param;
const request = utility.request_param;
const request_insert = utility.request_insert_id;
const request_update = utility.request_update;
const request_group = utility.request_group;
const request_move = utility.request_move;
const request_delete = utility.request_delete;
const update_param = utility.update_param;
const build_in_param = utility.build_in_param;


const TABLE = INSTRUCTIONS;
//GET A PARTICULAR CATEGORY
router.get(`/cat/:${TABLE[1]}`, (req, res)=>{
    let param = req.params;
    let completeQuery = build_param(param)
    const sql = `SELECT *  FROM ${ TABLE[0] } ${ completeQuery }`; 
    request(sql, res);
})

//GET A MULTIPLE IDS
router.patch(`/mult/:${TABLE[1]}`, (req, res)=>{
    
    if(req.body && Object.keys(req.body).length > 0 )
    {
        let param = build_in_param(req.body[TABLE[1]], TABLE[1]);
        const sql = `SELECT * FROM ${TABLE[0]} WHERE ${param}`;
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

//CHANGE QUESTIONS AND INSTRUCTION GROUP
router.patch(`/group/:id`, (req, res)=>{
    let param = build_param(req.params);
    let id = req.params.id;
    let completeQuery = update_param(req.body);
    const sql = `UPDATE ${ TABLE[0] } SET ${ completeQuery } ${ param }`;
    const sqlr = `SELECT * FROM ${TABLE[0]} WHERE id = ${id}`;
    request_group(id, req.body.grp);
    request_update(sql, sqlr, res);
})

//MOVE INSTRUCTION
router.patch(`/move/:id`, (req, res)=>{
    let param = build_param(req.params);
    let id = req.params.id;
    let completeQuery = update_param(req.body);
    const sql = `UPDATE ${ TABLE[0] } SET ${ completeQuery } ${ param }`;
    const sqlr = `SELECT * FROM ${TABLE[0]} WHERE id = ${id}`;
    request_move(TABLE[0], TABLE[1], null, id, req.body.instructionID);
    //request_update(sql, sqlr, res);
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