const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'u3r5w4ayhxzdrw87.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'acb4e69nvb744d2s',
    password: 'ko4o023sx1ju87f9',
    database: 'bdgbm8kovryrxe2y',
    charset: "utf8mb4"
});

module.exports = pool;