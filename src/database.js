const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tinder_unizar',
    charset: "utf8mb4"
});

module.exports = pool;