const { Payments } = require("../models")

const createPayment = async (paymentBody) => {
    console.log(paymentBody)
    const payment = await Payments.create(paymentBody)
    return payment
}

const getOrderStatus = async (whereQuery) => {
    const data = await Payments.findOne({ where: whereQuery ,attributes:['order_id','status','amount','payment_method']})
    return data
}

module.exports = { createPayment, getOrderStatus }