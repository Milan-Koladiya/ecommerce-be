const categoryService = require("../services/category.service")
const userService = require("../services/user.service")
const { successRes, catchRes, errorRes } = require("../utils/response.function")


const createCategoryController = async (req, res) => {

    try {
        const { name } = req.body
        const seller_id = req.user.id


        if (req.user.role !== 'seller' && req.user.role !== 'admin') {
            return errorRes(res, "only seller and admin can add category")
        }

        const sellerExist = await userService.findUser({ id: seller_id })
        if (!sellerExist) {
            return errorRes(res, "Seller not Found!")
        }

        const catagoryExist = await categoryService.findCategory({ name: name })
        if (catagoryExist) {
            return errorRes(res, "Category Already exist!")
        }

        const data = {
            ...req.body,
            seller_id: seller_id
        }
        
        const categoryData = await categoryService.createCategory(data)
        return successRes(res, "Category Add Successfully", categoryData, 201)
    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }

}

const getAllCategory = async (req, res) => {
    try {

        // if (req.user.role !== 'seller' && req.user.role !== 'admin') {
        //     return errorRes(res, "only seller and admin can get category")
        // }

        const allCategory = await categoryService.getAllCategory()
        return successRes(res, "Get All Category Successfully", allCategory, 200)
    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }

}


const updateCategory = async (req, res) => {
    try {
        const categoryBody = req.body
        const id = req.params.id
        const seller_id = req.user.id

        if (req.user.role !== 'seller' && req.user.role !== 'admin') {
            return errorRes(res, "only seller and admin can update category")
        }

        const sellerExist = await userService.findUser({ id: seller_id })
        if (!sellerExist) {
            return errorRes(res, "Seller not Found!")
        }

        const category = await categoryService.findCategory({ id: id })
        if (!category) {
            return errorRes(res, "Category Not Found!")
        }

        const updatedata = await categoryService.updateCategory(categoryBody, { id: id })
        return successRes(res, "category Update Successfully!", updatedata, 200)
    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }

}


const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)

        if (req.user.role !== 'seller' && req.user.role !== 'admin') {
            return errorRes(res, "only seller and admin can delete category")
        }

        const category = await categoryService.findCategory({ id: id })
        if (!category) {
            return errorRes(res, "Category Not Found!")
        }

        const deletedUser = await categoryService.deleteCategory({ id: id })
        return successRes(res, "Category deleted successfully", deletedUser)
    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }
}

module.exports = { createCategoryController, getAllCategory, updateCategory, deleteCategory }