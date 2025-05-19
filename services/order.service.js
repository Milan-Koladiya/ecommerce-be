const { where } = require("sequelize")
const { Order,order_items_ } = require("../models")

const createOrder = async (userBody) => {
}

const getUsersOrders=async(userBody,whereQuery,attributes)=>{
    const order=await Order.findAll(userBody,{ where: whereQuery, attributes },attributes)
    return order
}


const getOrderById=async(whereQuery)=>{
    const order=await Order.findOne(whereQuery)
    return order
}

module.exports = { createOrder, getUsersOrders,getOrderById}