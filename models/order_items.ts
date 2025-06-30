import { DataTypes} from "sequelize";
const { Model,Sequelize} = require("sequelize")

export default (sequelize:typeof Sequelize, DataType:typeof DataTypes) => {
  class Order_items extends Model {
    static associate(db:any) {
      Order_items.belongsTo(db.Order, { as: 'order', foreignKey: 'order_id' });
      Order_items.belongsTo(db.Product, { as: 'product', foreignKey: 'product_id' });

    }
  }

  Order_items.init({
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    },
    order_id: {
      type: DataType.UUID,
      allowNull: false,
      references: {
        model: 'order',
        foreignKey: 'id'
      }
    },
    product_id: {
      type: DataType.UUID,
      allowNull: false,
      references: {
        model: 'product',
        foreignKey: 'id'
      }
    },
    price: {
      type: DataType.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 1,
    }
  }, {
    sequelize,
    modelName: 'Order_items',
    freezeTableName: true,
    tableName: 'order_items',
    timestamps: true,
    paranoid: true
  });

  return Order_items;
};
