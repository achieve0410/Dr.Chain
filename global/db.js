/*
 * Created on June 11, 2019
 * Dr.Chain Project
 * @author: Jae-Hyeong Kim, Su-Min Lee, Won-Hyo Choi
 */

// import mysql module and setting
const mysql = require('mysql');
const conn = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'hermes',
  port : 3306,
  database : 'hermes'
});

conn.connect((err) => { // Error handling
  if(err){
    throw err;
  }
});

module.exports = conn;
