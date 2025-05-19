const orderService = require("../services/order.service")
const { successRes, catchRes, errorRes } = require("../utils/response.function")


const createOrder = async (req, res) => {
    try {

    }
    catch (error) {
        console.log("Something want wrong!", error.message)
        return catchRes(res, error.message, 500)
    }
}

const getOrderById=async(req,res)=>{
    try {
        const order_id = req.params
        const order = await orderService.getOrderById({id:order_id});
        if(!order){
            return errorRes(res,"Order not found")
        }
        return successRes(res, "Order Data Found", user, 200)
    }
    catch (error) {
        console.log("Something want wrong!", error.message)
        return catchRes(res, error.message, 500)
    }
}

module.exports = { createOrder, getOrderById }