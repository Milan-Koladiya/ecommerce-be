import db from "../models"
const { Payments } = db;

const createPayment = async (paymentBody:any) => {
    console.log(paymentBody)
    const payment = await Payments.create(paymentBody)
    return payment
}

const getOrderStatus = async (whereQuery:any) => {
    const data = await Payments.findOne({ where: whereQuery ,attributes:['order_id','status','amount','payment_method']})
    return data
}

module.exports = { createPayment, getOrderStatus }