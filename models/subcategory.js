const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subcategory extends Model {
    static associate(db) {
        Subcategory.belongsTo(db.Category, { as: 'category', foreignKey: 'category_id'});
      
        Subcategory.belongsTo(db.User, { as: 'seller', foreignKey: 'seller_id' });

        Subcategory.hasMany(db.Product, { as: 'product', foreignKey: 'subcategory_id'});

      }      
  }

  Subcategory.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notNull: { msg: "Subcategory name is required" } }
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'category',
        key: 'id'
      }
    },
    seller_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
    }
  }, {
    sequelize,
    modelName: 'Subcategory',
    freezeTableName: true,
    tableName: 'subcategory',
    timestamps: true,
    paranoid:true

  });

  return Subcategory;
};
