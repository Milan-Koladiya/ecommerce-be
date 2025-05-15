

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require(path.join(__dirname, '../config/index')); 
const basename = path.basename(__filename);
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter(file =>
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js'
  )
  .forEach(file => {
    const modelPath = path.join(__dirname, file);
    const modelFn = require(modelPath);
    
    if (typeof modelFn === 'function') {
      const model = modelFn(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    } 

  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
