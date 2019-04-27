const pageList = {
    page: function (listQuery) {
        var sql = 'SELECT * FROM ' + listQuery.table ;
        sql = this.condition(sql, listQuery)
        if (listQuery.page && listQuery.pageSize) {
            var pos = (listQuery.page - 1) * listQuery.pageSize
            var end = listQuery.page * listQuery.pageSize
            sql += ' LIMIT ' + pos + ',' + end
        }
        return sql
    },

    count: function (listQuery) {
        var sql = 'SELECT count(*) as count FROM ' + listQuery.table;
        sql = this.condition(sql, listQuery)
        return sql
    },

    condition: function (sql, listQuery) {
        var d = listQuery.like
        if (d != undefined) {
            sql+=' where 1=1 '
            for (const key in d) {
                sql = sql + ' AND ' + key + ' like '
                if (d.hasOwnProperty(key)) {
                    const element = d[key];
                    sql += element 
                }
            }
            
        }
        d = listQuery.and
        if (d != undefined) {
            sql+=' where 1=1 '
            for (const key in d) {
                sql = sql + ' AND ' + key + ' =  '
                if (d.hasOwnProperty(key)) {
                    const element = d[key];
                    sql += element 
                }
            }
            
        }
        d = listQuery.or
        if (d != undefined) {
            sql+=' where 1=2 '
            for (const key in d) {
                sql = sql + ' OR ' + key + ' =  '
                if (d.hasOwnProperty(key)) {
                    const element = d[key];
                    sql +='"' +element+'"' 
                }
            }
            
        }
        return sql
    }
}

const base = {
    getCourseList: function (params) {
        var sql = 'select * from  resource where id in ('
        for (let index = 0; index < params.length; index++) {
            const element = params[index];
            sql += element + ","
        }
        sql = sql.substring(0, sql.lastIndexOf(','))
        sql += ')'
        return sql;
    },
}

const userOpt = {
    getUser: 'select * from user where username=?'
}

const work = {
    delete: 'delete  from work where id=?'
}

const resource = {
    getOne: 'select * from resource where id=?'
}

const pub_content = {
    getOne: 'select * from pub_content where id=?'
}
const collect = {
    find: 'select * from collect where user_id="?" AND pub_id=?',
    delete:'delete from collect where user_id="?" AND pub_id=?'
}

const subOpt = {
    find: 'select * from sub where user_id="?"',
    update_dinyue:'update sub set dinyue=? where user_id="?" and topic="?"',
    update_soucan:'update sub set soucan=? where user_id="?" and topic="?"'
}

module.exports = {
    pageList,
    userOpt,
    work,
    base,
    resource,
    pub_content,
    subOpt,
    collect
};