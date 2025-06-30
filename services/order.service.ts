import db from "../models"
const { User, Category, Subcategory, Product, Order,Order_items,Cart} = db;

interface orderData{
    user_id:string,
    [key:string]:any
}

interface orderItemInput{
    product_id:string,
    price:number,
    quantity:number
}

const createOrder = async (data:orderData, items:orderItemInput[]) => {
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

const findOrdersByUser = async (userId:string) => {
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

const getOrderById = async (orderId:string, userId:string) => {
    return await Order.findOne({
        where: { id: orderId, user_id: userId },
        // include: [
        //     { model: Order_items, as: 'order_items' },
        // ],
    });
};

const findOrder = async (whereQuery:any, attributes = null) => {
    const order = await Order.findOne({ where: whereQuery, attributes })
    return order
}

const updateStatus = async (order_id:string, updateBody:any) => {
    const data = await Order.update(updateBody, {
        where: { id: order_id }
    });
    return data;
};

module.exports = { createOrder, findOrdersByUser, getOrderById, findOrder, updateStatus }