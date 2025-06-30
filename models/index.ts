
import fs from 'fs';
import path from 'path';
const Model=require('sequelize')
const Sequelize = require('sequelize');
const DataTypes=require('sequelize')
const config = require(path.join(__dirname, '../config/index')); 

const basename = path.basename(__filename);
const db: { [key: string]: any } = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);


fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' &&
      !file.endsWith('.d.ts')
    );
  })
  .forEach((file) => {
    const modelPath = path.join(__dirname, file);
    const modelFn = require(modelPath).default;

    if (typeof modelFn === 'function') {
      const model = modelFn(sequelize, DataTypes);
      db[model.name] = model;
    }
  });

Object.keys(db).forEach((modelName) => {
  if (typeof db[modelName].associate === 'function') {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
export default db;


