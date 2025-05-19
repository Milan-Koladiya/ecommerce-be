const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(db) {
        Order.belongsTo(db.User, { as: 'user', foreignKey:'user_id' });

        Order.hasMany(db.Order_items, { as: 'order_items', foreignKey:'order_id' });

        Order.hasMany(db.Payments, { as: 'payments', foreignKey:'order_id' });

    }
  }

  Order.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references:{
        model:'users',
        foreignKey:'id'
      }
    },
    total_amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    status:{
        type: DataTypes.ENUM('panding','paid','failed'),
        allowNull: false,
        defaultValue:'panding',
        validate: {
          isIn: {
            args: [['panding','paid','failed']],
            msg: 'status must be panding,paid,failed'
          }
        }
    
    },
    payment_reference:{
        type:DataTypes.STRING,
        allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Order',
    freezeTableName: true,
    tableName: 'order',
    timestamps: true,
    paranoid:true
  });

  return Order;
};
