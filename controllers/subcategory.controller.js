const categoryService = require("../services/category.service")
const userService = require("../services/user.service")
const subcategoryService = require("../services/subcategories.service")
const { successRes, catchRes, errorRes } = require("../utils/response.function")


const createSubcategoryController = async (req, res) => {

    try {

        const seller_id = req.user.id
        const { name, category_id } = req.body

        if (req.user.role !== 'seller' && req.user.role !== 'admin') {
            return errorRes(res, "only seller and admin can add subcategory")
        }

        const sellerExist = await userService.findUser({ id: seller_id })
        if (!sellerExist) {
            return errorRes(res, "Seller not Found!")
        }

        const catagoryExist = await categoryService.findCategory({ id: category_id })
        if (!catagoryExist) {
            return errorRes(res, "Category not found!")
        }

        const data={
            ...req.body,
            seller_id
        }
        const subcategoryData = await subcategoryService.createSubcategory(data)
        return successRes(res, "SubCategory Add Successfully", subcategoryData, 201)
    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }

}

const findSubcategoryCategoryIdWise = async (req, res) => {
    try {
        const category_id = req.query.category_id

        if (req.user.role !== 'seller' && req.user.role !== 'admin') {
            return errorRes(res, "only seller and admin can find subcategory")
        }

        const catagoryExist = await categoryService.findCategory({ id: category_id })
        if (!catagoryExist) {
            return errorRes(res, "Category not found!")
        }

        const subcategoryData = await subcategoryService.getAllSubcategoryCategoryWise({ category_id: req.query.category_id })

        if (subcategoryData.length == 0) {
            return errorRes(res, "nosubcategory found in this category")
        }

        return successRes(res, "Get subcategory category id wise", subcategoryData, 200)
    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }

}


const updateSubcategory = async (req, res) => {
    try {
        const subcategoryBody = req.body
        const id = req.params.id

        if (req.user.role !== 'seller' && req.user.role !== 'admin') {
            return errorRes(res, "only seller and admin can update subcategory")
        }

        const sellerExist = await userService.findUser({ id: subcategoryBody.seller_id })
        if (!sellerExist) {
            return errorRes(res, "Seller not Found!")
        }

        const categoryexist = await categoryService.findCategory({ id: subcategoryBody.category_id })
        if (!categoryexist) {
            return errorRes(res, "Category Not Found!")
        }

        const subcategory = await subcategoryService.findSubcategory({ id: id })
        if (!subcategory) {
            return errorRes(res, "Subcategory Not Found!")
        }

        const updatedata = await subcategoryService.updateSubcategory(subcategoryBody, { id: id })
        return successRes(res, "subcategory Update Successfully!", updatedata, 200)
    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }

}

const deleteSubcategory = async (req, res) => {
    try {
        const id = req.params.id

        if (req.user.role !== 'seller' && req.user.role !== 'admin') {
            return errorRes(res, "only seller and admin can delete subcategory")
        }

        const subcategory = await subcategoryService.findSubcategory({ id: id })
        if (!subcategory) {
            return errorRes(res, "Subcategory Not Found!")
        }

        const deletedSubcategory = await subcategoryService.deleteSubcategory({ id: id })
        return successRes(res, "Subcategory deleted successfully", deletedSubcategory)
    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }
}

const getAllSubcategory = async (req, res) => {
    try {

        if (req.user.role !== 'seller' && req.user.role !== 'admin') {
            return errorRes(res, "only seller and admin can get subcategory")
        }

        const allSubcategory = await subcategoryService.getAllSubcategory()
        return successRes(res, "Get All Subcategory Successfully", allSubcategory, 200)
    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }

}

module.exports = { createSubcategoryController, findSubcategoryCategoryIdWise, updateSubcategory, deleteSubcategory, getAllSubcategory }