const {  Model, Sequelize } = require('sequelize');
import { DataTypes } from "sequelize";


export default(sequelize:typeof Sequelize, DataType:typeof DataTypes) => {
  class Product extends Model {
    static associate(db:any) {

        Product.belongsTo(db.User, {as: 'seller', foreignKey: 'seller_id' });

        Product.belongsTo(db.Category, { as: 'category', foreignKey: 'category_id' });

        Product.belongsTo(db.Subcategory, {as: 'subcategory', foreignKey: 'subcategory_id' });

        Product.hasMany(db.Cart, {as: 'cart', foreignKey: 'product_id'});

        Product.hasMany(db.Order_items, { as: 'order_items', foreignKey:'product_id' });

      }      
  }

  Product.init({
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: { notNull: { msg: "Product name is required" } }
    },
    description: {
        type: DataType.STRING,
        allowNull: false,
    },
    price: {
        type: DataType.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataType.INTEGER,
        allowNull: false,
    },
    image_url: {
        type: DataType.STRING,
    },
    category_id: {
      type: DataType.UUID,
      allowNull: false,
      references: {
        model: 'category',
        key: 'id'
      }
    },
    subcategory_id: {
        type: DataType.UUID,
        allowNull: false,
        references: {
          model: 'subcategory',
          key: 'id'
        }
      },
    seller_id: {
        type: DataType.UUID,
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
