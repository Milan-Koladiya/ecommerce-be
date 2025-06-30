const orderService = require("../services/order.service");
const paymentService = require("../services/payment.service")
const { successRes, catchRes, errorRes } = require("../utils/response.function");
import { Request,Response } from "express"

const createPayment = async (req:any, res:Response) => {
    try {
        const { order_id, amount, status, payment_method, paid_at } = req.body;
        if (req.user.role !== 'buyer') {
            return errorRes(res, "only buyer can create payment")
        }


        const order = await orderService.findOrder({ id: order_id })
        if (!order) {
            return errorRes(res, 'order Not Found!')
        }

        const payment = await paymentService.createPayment(req.body)

        if (status === 'success') {
            await orderService.updateStatus(order_id, { status: 'paid' });
        } else {
            await orderService.updateStatus(order_id, { status: 'failed' });
        }
        return successRes(res, "payment successfully", payment, 201)
    }
    catch (error:any) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)

    }
}

const getStatus = async (req:any, res:Response) => {
    try {
        const { order_id } = req.params

        if (req.user.role !== 'buyer') {
            return errorRes(res, "only buyer can get order details!")
        }


        const order = await orderService.findOrder({ id: order_id })
        if (!order) {
            return errorRes(res, 'order Not Found!')
        }

        const orderStatus = await paymentService.getOrderStatus({order_id:order_id})
        return successRes(res, "payment status get successfully", orderStatus, 200)

    }
    catch (error:any) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }
}


module.exports = { createPayment, getStatus }