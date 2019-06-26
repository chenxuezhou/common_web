const pageList = {
    page: function (table, page, pageSize, listQuery, sort) {
        var sql = 'SELECT * FROM ' + table + ' where 1=1 ';
        sql = this.condition(sql, listQuery)
        if (sort != undefined && sort != '') {
            sql += ' ' + sort
        }
        if (page != undefined && pageSize != undefined) {
            var pos = page * pageSize
            var end = (page + 1) * pageSize
            sql += ' LIMIT ' + pos + ',' + end
        }
        return sql
    },

    count: function (table, listQuery) {
        var sql = 'SELECT count(*) as count FROM ' + table + ' where 1=1 ';
        sql = this.condition(sql, listQuery)
        return sql
    },

    condition: function (sql, listQuery) {
        // debugger
        var d = listQuery.like
        if (d != undefined) {
            for (const key in d) {
                sql = sql + ' AND ' + key + ' like "%'
                if (d.hasOwnProperty(key)) {
                    const element = d[key];
                    sql += element + '%"'
                }
            }

        }
        d = listQuery.and
        if (d != undefined) {
            for (const key in d) {

                if (d.hasOwnProperty(key) && d[key] != undefined) {
                    sql = sql + ' AND ' + key + ' =  '
                    const element = d[key];
                    sql += element
                }
            }

        }
        d = listQuery.or
        // debugger
        if (d != undefined) {
            var f = true, k = false
            for (const key in d) {
                if (f&& d[key] != undefined) {
                    sql += ' AND ( 1!=1 '
                    f = false
                    k = true
                }
                
                if (d.hasOwnProperty(key) && d[key] != undefined) {
                    sql = sql + ' OR ' + key + ' =  '
                    const element = d[key];
                    sql += '"' + element + '"'
                }
            }
            if (k) {
                sql += ')'
            }

        }
        return sql
    }
}

const base = {
    getAll: function (table) {
        var sql = 'SELECT * FROM ' + table;
        return sql;
    },
}

const userOpt = {
    getUser: 'select * from user where username="?"',
    getOne: 'select * from user where id=?',
    login: 'select * from user where username="?" and password="?"',
}
const roleOpt = {
    find: 'select p.name from  users_roles ur LEFT JOIN role r ON r.id=ur.role_id left join roles_permissions rp on rp.role_id=r.id left join permission p on p.id=rp.permission_id where ur.user_id=?',
}

const work = {
    delete: 'delete  from work where id=?'
}


module.exports = {
    pageList,
    userOpt,
    work,
    base,
    roleOpt
};