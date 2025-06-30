const orderService = require("../services/order.service")
const userService = require("../services/user.service")
const { successRes, catchRes, errorRes } = require("../utils/response.function")
import { Request,Response } from "express"


const createOrder = async (req:any, res:Response) => {

    try {
        const userId = req.user.id;
        let { items, payment_reference } = req.body;
        console.log("===",req.body,"===")
        if (req.user.role !== 'buyer') {
            return errorRes(res, "only buyer create the order!")
        }

        if (typeof items === 'string') {
            items = JSON.parse(items);
        }

        if (!Array.isArray(items) || items.length === 0) {
            return errorRes(res, 'Items must be a non-empty array')
        }
    
        const total_amount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
        const order = await orderService.createOrder({
            user_id: userId,
            total_amount,
            payment_reference,
            status: 'pending',
        }, items);

        console.log(order)
        return successRes(res, "Order create successfully", order, 201)

    }
    catch (error:any) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }
}


const getOrdersByUser = async (req:any, res:Response) => {

    try {
        const userId = req.user.id
        const orders = await orderService.findOrdersByUser(userId);

        // if (req.user.role !== 'buyer') {
        //     return errorRes(res, "only buyer can get our orders")
        // }

        return successRes(res, "Order Data Found", orders, 200)

    } catch (error:any) {
        console.log("Something want wrong!", error.message)
        return catchRes(res, error.message, 500)
    }
}

const getOrderById = async (req:any, res:Response) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        if (req.user.role !== 'buyer') {
            return errorRes(res, "only buyer can get the order")
        }

        const order = await orderService.getOrderById(id, userId);
        if (!order) {
            return errorRes(res, 'Order not found')
        }
        return successRes(res, "Order Data Found", order, 200)
    }
    catch (error:any) {
        console.log("Something want wrong!", error.message)
        return catchRes(res, error.message, 500)
    }
}

const getUserWithOrders = async (req:Request, res:Response) => {
    try {
        const data = await userService.getUserWithOrders()
        return successRes(res, "Get orders Of All Users", data)
    }
    catch (error:any) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }
}

module.exports = { createOrder, getOrdersByUser, getOrderById, getUserWithOrders }