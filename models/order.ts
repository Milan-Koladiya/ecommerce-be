import { DataTypes } from "sequelize";
const { Model,Sequelize} = require('sequelize');

export default (sequelize:typeof Sequelize , DataType:typeof DataTypes) => {
  class Order extends Model {
    static associate(db:any) {
        Order.belongsTo(db.User, { as: 'user', foreignKey:'user_id' });

        Order.hasMany(db.Order_items, { as: 'order_items', foreignKey:'order_id' });

        Order.hasMany(db.Payments, { as: 'payments', foreignKey:'order_id' });

    }
  }

  Order.init({
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataType.UUID,
      allowNull: false,
      references:{
        model:'users',
        foreignKey:'id'
      }
    },
    total_amount:{
        type:DataType.INTEGER,
        allowNull:false
    },
    status:{
        type: DataType.ENUM('pending','paid','failed'),
        allowNull: false,
        defaultValue:'pending',
        validate: {
          isIn: {
            args: [['pending','paid','failed']],
            msg: 'status must be pending,paid,failed'
          }
        }
    
    },
    payment_reference:{
        type:DataType.STRING,
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
