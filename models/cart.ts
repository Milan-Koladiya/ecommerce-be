import { DataTypes } from "sequelize";
const { Model,Sequelize} = require("sequelize")

export default(sequelize:typeof Sequelize, DataType:typeof DataTypes) => {
    class Cart extends Model {
        static associate(db:any) {
            Cart.belongsTo(db.User, { as: 'buyer', foreignKey: 'user_id' })

            Cart.belongsTo(db.Product, { as: 'product', foreignKey: 'product_id' })

        }
    }
    Cart.init({
        id: {
            type: DataType.UUID,
            defaultValue: DataType.UUIDV4,
            primaryKey: true,
        },

        user_id: {
            type: DataType.UUID,
            references: {
                model: 'users',
                foreignKey: 'id'
            }
        },
        product_id: {
            type: DataType.UUID,
            references: {
                model: 'product',
                foreignKey: 'id'
            }
        },
        quantity: {
            type: DataType.INTEGER,
            allowNull: false,
        }

    }, {
        sequelize,
        timestamps: true,
        paranoid: true,
        tableName: 'cart',
        modelName: "Cart",
        // indexes: [
        //     {
        //         unique: true,
        //         fields: ['user_id', 'product_id']
        //     }
        // ]

    });
    return Cart
} 