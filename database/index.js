const mysql = require('mysql2');
const Sequelize = require("sequelize");

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: "",
  database: 'iotdb',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.query(`select * from Devices`,(err,res,fields) => {
  if(err){
    console.log(err);
  }

  console.log(res);
})

const dbConfig = require("../config/config.json")[process.env.NODE_ENV || "development"];

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
