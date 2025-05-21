const { User, Order, Product } = require("../models");

const getBuyer = async () => {
    const buyer = await User.findAll({
        where: { role: 'buyer' },
        include: [
            {
                model: Order,
                as: "order",
                attributes: ['id', 'total_amount', 'status', 'createdAt'],
            }
        ],
        attributes: ['id', 'role', 'email'],
    });
    return buyer;
};



const getSeller = async () => {
    const buyer = await User.findAll({
        where: { role: 'seller' },
        include: [
            {
                model: Product,
                as: "product",
                attributes: ['id','name'],
            }
        ],
        attributes: ['id', 'role', 'email'],
    });
    return buyer;
};

module.exports = { getBuyer, getSeller };
