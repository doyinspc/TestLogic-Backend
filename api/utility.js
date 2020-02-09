const mysql = require('./../config/index');
module.exports = {
    build_param : (data) => {
        if(Object.keys(data).length  > 0)
        {
            let str = '';
            for(d in data)
            {
                if(str.length > 0){
                    str += ' AND ';
                }
                str += ` ${ d } = "${data[d]}" `;
            }
            if(str.length > 0){
                return `where ${str}`
            }
        }else{
            return  '';
        }
    },
    build_param_active : (data) => {
        if(Object.keys(data).length  > 0)
        {
            let str = '';
            for(d in data)
            {
                if(str.length > 0){
                    str += ' AND ';
                }
                str += ` ${ d } = "${data[d]}" `;
            }
            if(str.length > 0){
                return `where ${str} AND active = '1'`
            }
        }else{
            return  '';
        }
        
    },
    build_in_param : (dat, main) => {
        let data = dat.split(',');
        let num = data.length;
        let values = '';
        for(let v in data )
            {
                num = num - 1;
                if(num > 0){
                    values = ` ${values} "${String(data[v])}", `;
                }
                else{
                    values = ` ${values} "${String(data[v])}"  `;
                }
            }
        
        return values= ` ${main} IN (${values})`;
    },
    concat_where_and : (data) => {
        if(Object.keys(data).length  > 0 )
        {
            let values = '';
            let num = Object.keys(data).length;
            for(let v in data )
            {
                num = num - 1;
                if(num > 0){
                    values = ` ${values} ${String(data[v])}  AND `;
                }
                else{
                    values = ` ${values} ${String(data[v])}  `;
                }
            }
                
            values = ` WHERE ${values}`;
            return values;
        }
        else{
            return null
        }
        
    },
    insert_param : (data) => {
        if(Object.keys(data).length  > 0)
        {
            let keys =  '';
            let values = '';
            let num = Object.keys(data).length;
            for(let v in data )
            {
                num = num - 1;
                if(num > 0){
                    keys = `${keys} ${String(v)} , `;
                    values = `${values} "${String(data[v])}" , `;
                }
                else{
                    keys = `${keys} ${String(v)} `;
                    values = `${values} "${String(data[v])}"  `;
                }
            }
                
            keys = '( '+ keys +' )';
            values = '( '+ values +' )';
            return [keys, values];
        }
        else{
            return null;
        }
    },
    update_param : (data) => {
        if(Object.keys(data).length  > 0)
        {
            let keys =  '';
            let num = Object.keys(data).length;
            for(let v in data )
            {
                num = num - 1;
                if(num > 0){
                    keys = `${keys} ${String(v)}  =  "${String(data[v])}" , `;
                }
                else{
                    keys = `${keys} ${String(v)}  =  "${String(data[v])}"  `;
                }
            }
                
            return keys;
        }
        else{
            return null;
        }
    },
    request_param : (sql, res) => {
        mysql.query(sql, (err, rows, fields)=>{
            if(!err){
                res.send(rows);
            }else{
                res.send(`Database Connection Failed ${JSON.stringify(err, undefined, 2)}`);
            }
        })
    },
    request_insert_id : (sql, res) => {
        mysql.query(sql, (err, rows, fields)=>{
            if(!err){
                res.send(rows);
            }else{
                console.log(`Database Insertion Failed ${JSON.stringify(err, undefined, 2)}`)
                res.send(`Database Insertion Failed ${JSON.stringify(err, undefined, 2)}`);
            }
        })
    },
    request_user : (sql, sql_in, res) => {
        mysql.query(sql, (err, rows, fields)=>{
            if(!err){
               res.send(rows);
            }else{
                mysql.query(sql_in, (err1, rows1, fields1)=>{
                    if(!err1){
                        res.send(rows1);
                    }else{
                        console.log(`Database Insertion Failed ${JSON.stringify(err1, undefined, 2)}`)
                        res.send(`Database Insertion Failed ${JSON.stringify(err1, undefined, 2)}`);
                    }
                })
            }
        })
    },
    request_group : (id, num) => {
        let sql = `UPDATE questions SET grp = ${num} WHERE instructionID = ${id} AND grp < ${num}` ;
        let sqlr = `SELECT * FROM questions WHERE instructionID = ${id} AND grp = ${num}`;
        mysql.query(sql, (err, rows, fields)=>{
            if(!err){
                mysql.query(sqlr, (err, rows, fields)=>{
                    if(!err){
                        res.send(rows);
                    }else{
                        res.send(`Database Insertion update Failed ${JSON.stringify(err, undefined, 2)}`);
                    }
                    
                })
            }else{
                res.send(`Database update Failed ${JSON.stringify(err, undefined, 2)}`);
            }
        })
    },
    request_move : (DB, DBCOL, id, news, olds) => {
        let sql = '';

        if(id && parseInt(id) > 0)
        {
            sql = `UPDATE ${DB} SET ${DBCOL} = ${news} WHERE id = ${id}` ;
        }else if(olds && parseInt(olds) > 0)
        {
            sql = `UPDATE ${DB} SET ${DBCOL} = ${news} WHERE ${DBCOL} = ${olds}` ;
        }
        mysql.query(sql, (err, rows, fields)=>{
            if(!err){
               
            }else{
                res.send(`Database update Failed ${JSON.stringify(err, undefined, 2)}`);
            }
        })
    },
    request_update : (sql, sqlr, res) => {
        mysql.query(sql, (err, rows, fields)=>{
            if(!err){
                mysql.query(sqlr, (err, rows, fields)=>{
                    if(!err){
                        res.send(rows);
                    }else{
                        res.send(`Database Insertion update Failed ${JSON.stringify(err, undefined, 2)}`);
                    }
                })
            }else{
                res.send(`Database update Failed ${JSON.stringify(err, undefined, 2)}`);
            }
        })
    },
    request_delete : (id, sql, res) => {
        mysql.query(sql, (err, rows, fields)=>{
            if(!err){
                res.send(id);
            }else{
                res.send(`Database Insertion Failed ${JSON.stringify(err, undefined, 2)}`);
            }
        })
    }
}