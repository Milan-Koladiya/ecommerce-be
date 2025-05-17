const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(db) {
        Category.belongsTo(db.User, { as: 'seller', foreignKey: 'seller_id' });
      
        Category.hasMany(db.Subcategory, { as: 'subcategory', foreignKey: 'category_id' }); 

        Category.hasMany(db.Product, { as: 'product', foreignKey: 'category_id'});

    }
  }

  Category.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notNull: { msg: "Category name is required" } }
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
    modelName: 'Category',
    freezeTableName: true,
    tableName: 'category',
    timestamps: true,
    paranoid:true
  });

  return Category;
};
