
const { Order, Cart,Product, Order_items, Payments } = require("../models")

const createOrder = async (data, items) => {
    const order = await Order.create(data);
    const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        price: item.price,
        quantity: item.quantity

    }));
    await Order_items.bulkCreate(orderItems);

    await Cart.destroy({
        where: {
            user_id: data.user_id,
            product_id: items.map(item => item.product_id)
        }
    });

    return order;
};

const findOrdersByUser = async (userId) => {
    return await Order.findAll({
        where: { user_id: userId },
        include: [
            {
                model: Order_items,
                as: 'order_items',
                attributes: ['id', 'order_id', 'product_id', 'price', 'quantity'],
                include: [
                    {
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'name', 'description', 'price', 'image_url']
                    }
                ]
            }
        ]
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

const findOrder = async (whereQuery, attributes = null) => {
    const order = await Order.findOne({ where: whereQuery, attributes })
    return order
}

const updateStatus = async (order_id, updateBody) => {
    const data = await Order.update(updateBody, {
        where: { id: order_id }
    });
    return data;
};

module.exports = { createOrder, findOrdersByUser, getOrderById, findOrder, updateStatus }