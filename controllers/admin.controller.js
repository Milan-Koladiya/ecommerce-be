const adminService = require("../services/admin.service")
const { successRes, catchRes, errorRes } = require("../utils/response.function")


const getBuyer = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return errorRes(res, "Only admin can get All Buyer!")
        }

        const data = await adminService.getBuyer()
        return successRes(res, "admin can get the all buyer ", data, 200)
    }
    catch (error) {
        console.log("Something want wrong!", error.message)
        return catchRes(res, error.message, 500)
    }
}

const getSeller = async (req, res) => {
    try {

        if (req.user.role !== 'admin') {
            return errorRes(res, "Only admin can get All Seller!")
        }

        const data = await adminService.getSeller()
        return successRes(res, "admin can get the all seller ", data, 200)
    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }
}

module.exports = { getBuyer, getSeller }