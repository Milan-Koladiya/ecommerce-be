const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(db) {

        Product.belongsTo(db.User, {as: 'seller', foreignKey: 'seller_id' });

        Product.belongsTo(db.Category, { as: 'category', foreignKey: 'category_id' });

        Product.belongsTo(db.Subcategory, {as: 'subcategory', foreignKey: 'subcategory_id' });

        Product.hasMany(db.Cart, {as: 'cart', foreignKey: 'product_id'});

        Product.hasMany(db.Order_items, { as: 'order_items', foreignKey:'product_id' });

      }      
  }

  Product.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notNull: { msg: "Product name is required" } }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'category',
        key: 'id'
      }
    },
    subcategory_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'subcategory',
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
    modelName: 'Product',
    tableName: 'product',
    timestamps: true,
    paranoid:true

  });

  return Product;
};
