const path = require('path');
require('dotenv').config();

module.exports = {
  username: process.env.UNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  dialect:process.env.DIALECT,
  logging: false
};
