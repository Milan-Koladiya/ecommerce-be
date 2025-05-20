const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order_items extends Model {
    static associate(db) {
        Order_items.belongsTo(db.Order, { as: 'order', foreignKey:'order_id' });
        Order_items.belongsTo(db.Product, { as: 'Product', foreignKey:'product_id' });
      
    }
  }

  Order_items.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references:{
        model:'order',
        foreignKey:'id'
      }
    },
    product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references:{
          model:'product',
          foreignKey:'id'
        }
      },
      price:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Order_items',
    freezeTableName: true,
    tableName: 'order_items',
    timestamps: true,
    paranoid:true
  });

  return Order_items;
};
