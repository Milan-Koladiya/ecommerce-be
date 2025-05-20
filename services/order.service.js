
const { Order, Order_items,Payments } = require("../models")

const createOrder = async (data, items) => {
    const order = await Order.create(data);
    const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        price: item.price,
    }));
    await Order_items.bulkCreate(orderItems);
    return order;
};

const findOrdersByUser = async (userId) => {
    
    return await Order.findAll({
        where: { user_id: userId },
        order: [['createdAt', 'DESC']],
    });
};

const getOrderById = async (orderId, userId) => {
    return await Order.findOne({
        where: { id: orderId, user_id: userId },
        // include: [
        //     { model: Order_items, as: 'order_items' },
        // ],
    });
};

module.exports = { createOrder, findOrdersByUser, getOrderById }