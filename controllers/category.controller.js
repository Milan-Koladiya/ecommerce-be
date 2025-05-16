const categoryService = require("../services/category.service")
const userService = require("../services/user.service")
const { successRes, catchRes, errorRes } = require("../utils/response.function")


const createCategoryController = async (req, res) => {

    try {
        const { name, seller_id } = req.body

        const sellerExist = await userService.findUser({ id: seller_id })
        if (!sellerExist) {
            return errorRes(res, "Seller not Found!")
        }

        const catagoryExist = await categoryService.findCategory({ name: name })
        if (catagoryExist) {
            return errorRes(res, "Category Already exist!")
        }

        const categoryData = await categoryService.createCategory(req.body)
        return successRes(res, "Category Add Successfully", categoryData, 201)
    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }

}

const getAllCategory = async (req, res) => {
    try {
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
        const  id  = req.params.id
        const sellerExist = await userService.findUser({ id: categoryBody.seller_id })
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
        
        const category = await categoryService.findCategory({ id: id })
        if (!category) {
            return errorRes(res, "Category Not Found!")
        }

        const deletedUser=await categoryService.deleteCategory({id:id})
        return successRes(res, "Category deleted successfully",deletedUser)
    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }
}

module.exports = { createCategoryController, getAllCategory, updateCategory ,deleteCategory}