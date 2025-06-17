const { Cart, Product } = require("../models")


const addToCart = async (cartBody) => {
    const cart = await Cart.create(cartBody)
    return cart
}

const findCart = async (whereQuery, attributes = null) => {
    const cart = await Cart.findOne({ where: whereQuery, attributes });
    return cart
};

const getAllCartItems = async (whereQuery, attributes = null) => {
    const cart = await Cart.findAll({
        where: whereQuery,
        include: [{
            model: Product,
            as: 'product',
            attributes: ['id', 'name', 'price', 'description','image_url']
        }]
    })
    return cart
};

const updateQuantity = async (cartBody, whereQuery) => {
    const cart = await Cart.update(cartBody, { where: whereQuery, paranoid: true })
    const updatedCartQuantity = await Cart.findOne({ where: whereQuery, paranoid: true });
    return updatedCartQuantity
}

const deleteProductFromCart = async (whereQuery) => {
    const cart = await Cart.destroy({ where: whereQuery })
    return cart
}

const clearCart = async (whereQuery) => {
    const deletedCount = await Cart.destroy({
        where: whereQuery
    });
    return deletedCount;
}
module.exports = { addToCart, findCart, getAllCartItems, updateQuantity, deleteProductFromCart, clearCart }