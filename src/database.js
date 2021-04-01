const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tinder_unizar'
});

module.exports = pool;