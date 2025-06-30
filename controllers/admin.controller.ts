const adminService = require("../services/admin.service")
const { successRes, catchRes, errorRes } = require("../utils/response.function")
import { Request,Response } from "express"
import type { IAuthRequest } from "../types/auth.types"

const getBuyer = async (req:IAuthRequest, res:Response) => {
    try {
        if (req.user?.role !== 'admin') {
            return errorRes(res, "Only admin can get All Buyer!")
        }

        const data = await adminService.getBuyer()
        return successRes(res, "admin can get the all buyer ", data, 200)
    }
    catch (error:any) {
        console.log("Something want wrong!", error.message)
        return catchRes(res, error.message, 500)
    }
}


const getSeller = async (req:IAuthRequest, res:Response) => {
    try {

        if (req.user?.role !== 'admin') {
            return errorRes(res, "Only admin can get All Seller!")
        }

        const data = await adminService.getSeller()
        return successRes(res, "admin can get the all seller ", data, 200)
    }
    catch (error:any) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }
}

const getDashboardSummery = async (req:IAuthRequest, res:Response) => {
    try {
        

        const data = await adminService.getDashboardSummery()
        console.log(data)
        return successRes(res, "get Dashboard Summery succesfully ", data, 200)
    }
    catch (error:any) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }
}
module.exports = { getBuyer, getSeller,getDashboardSummery}