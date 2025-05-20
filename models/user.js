const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(db) {
        User.hasMany(db.Category, { as: 'categories',foreignKey: 'seller_id'});
      
        User.hasMany(db.Subcategory, { as: 'subcategories', foreignKey: 'seller_id'});

        User.hasMany(db.Product, { as: 'product', foreignKey: 'seller_id'});

        User.hasMany(db.Cart, { as: 'cart', foreignKey: 'user_id'});

        User.hasMany(db.Order, { as: 'order', foreignKey: 'user_id'});

      }
      
  }

  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'First name is required' },
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Last name is required' },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: { msg: 'Email is required' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notNull: { msg: 'Password is required' } }
    },
    role: {
      type: DataTypes.ENUM('buyer', 'seller','admin'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['buyer', 'seller','admin']],
          msg: 'Role must be buyer or seller,admin'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    freezeTableName: true,
    tableName: 'users',
    timestamps: true,
    paranoid: true    
  });

  return User;
};
