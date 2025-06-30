const path = require('path');
require('dotenv').config();

interface DBconfig{
  username?:string,
  password?:string,
  database?:string,
  host?:string,
  port?:number|string,
  dialect?:string,
  logging?:boolean
}

const config:DBconfig= {
  username: process.env.UNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  dialect:process.env.DIALECT,
  logging: false
};

module.exports=config