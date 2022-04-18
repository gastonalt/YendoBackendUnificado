var mysqlData = require('mysql');

var mysql  = mysqlData.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'yendoappduenos'
    });

module.exports = mysql;