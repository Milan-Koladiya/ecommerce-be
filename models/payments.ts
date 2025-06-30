import { DataTypes } from "sequelize";
    const { Model,Sequelize } = require('sequelize');

    export default(sequelize:typeof Sequelize, DataType:typeof DataTypes) => {
        class Payments extends Model {
            static associate(db:any) {
                Payments.belongsTo(db.Order, { as: 'order', foreignKey: 'order_id' });

            }
        }

        Payments.init({
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
            amount: {
                type: DataType.INTEGER,
                allowNull: false
            },
            status: {
                type: DataType.ENUM('success', 'failed'),
                allowNull: false,
            },
            payment_method: {
                type: DataType.STRING,
                allowNull: false
            },
            paid_at: {
                type: DataType.DATE,
                allowNull:false
            }
        }, {
            sequelize,
            modelName: 'Payments',
            freezeTableName: true,
            tableName: 'payments',
            timestamps: true,
            paranoid: true
        });

        return Payments;
    };
