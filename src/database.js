const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'b1bf824e91c6e4',
    password: '776b378d',
    database: 'heroku_bb94b7f3e3fef39',
    charset: "utf8mb4"
});

module.exports = pool;