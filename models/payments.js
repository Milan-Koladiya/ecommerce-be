const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Payments extends Model {
        static associate(db) {
            Payments.belongsTo(db.Order, { as: 'order', foreignKey: 'order_id' });

        }
    }

    Payments.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        order_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'order',
                foreignKey: 'id'
            }
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('success', 'failed'),
            allowNull: false,
        },
        payment_method: {
            type: DataTypes.STRING,
            allowNull: false
        },
        paid_at: {
            type: DataTypes.DATE,
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
