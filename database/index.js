const mysql = require('mysql2');
const Sequelize = require("sequelize");
const dbConfig = require("../config/config.json")[process.env.NODE_ENV || "development"];

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: "sql6.freemysqlhosting.net",
  user: 'sql6475729',
  password: "hlvb8ZWUV9",
  database: 'sql6475729',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// * Used for testing connectivity to DB.
// pool.query(`select * from Devices`,(err,res,fields) => {
//   if(err){s
//     console.log(err);
//   }

//   console.log(res);
// })

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    // max: dbConfig.pool.max,
    // min: dbConfig.pool.min,
    // acquire: dbConfig.pool.acquire,
    // idle: dbConfig.pool.idle
  }
});

module.exports = {
  Sequelize,
  sequelize
};
