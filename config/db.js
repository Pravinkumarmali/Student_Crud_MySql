const mysql = require("mysql2/promise");

// create a connection pool.

const mysql_pool = mysql.createPool({
    host: "localhost",
    user:"",
    password: "",
    database: "students_db",

});

module.exports = mysql_pool;