const categoryService = require("../services/category.service")
const userService = require("../services/user.service")
const subcategoryService = require("../services/subcategories.service")
const { successRes, catchRes, errorRes } = require("../utils/response.function")


const createSubcategoryController = async (req, res) => {

    try {
        const { name, category_id, seller_id } = req.body

        const sellerExist = await userService.findUser({ id: seller_id })
        if (!sellerExist) {
            return errorRes(res, "Seller not Found!")
        }

        const catagoryExist = await categoryService.findCategory({ id: category_id })
        if (!catagoryExist) {
            return errorRes(res, "Category not found!")
        }

        const subcategoryData = await subcategoryService.createSubcategory(req.body)
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

        const catagoryExist = await categoryService.findCategory({ id: category_id })
        if (!catagoryExist) {
            return errorRes(res, "Category not found!")
        }

        const subcategoryData = await subcategoryService.getAllSubcategory({ category_id: req.query.category_id })

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


module.exports = { createSubcategoryController, findSubcategoryCategoryIdWise, updateSubcategory, deleteSubcategory }