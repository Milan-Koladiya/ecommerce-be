const productService = require("../services/product.service")
const categoryService = require("../services/category.service")
const subcategoryService = require("../services/subcategories.service")
const userService = require("../services/user.service")
const { successRes, catchRes, errorRes } = require("../utils/response.function")
const { Op } = require("sequelize");


const createProduct = async (req, res) => {
    try {
        const productBody = req.body

        if (req.user.role !== 'seller' && req.user.role !== 'admin') {
            return errorRes(res, "only seller and admin can create product")
        }

        const sellerExist = await userService.findUser({ id: productBody.seller_id })
        if (!sellerExist) {
            return errorRes(res, "Seller not Found!")
        }

        const catagoryExist = await categoryService.findCategory({ id: productBody.category_id })
        if (!catagoryExist) {
            return errorRes(res, "Category not found!")
        }

        const subcategoryexist = await subcategoryService.findSubcategory({ id: productBody.subcategory_id })
        if (!subcategoryexist) {
            return errorRes(res, "Suncategory not found!")
        }

        const file = req.file

        const data = {
            ...productBody,
            image_url: file.path
        }

        const product = await productService.createProduct(data);
        return successRes(res, "Product Add In Category", product, 201)
    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }
}

const getSingleProduct = async (req, res) => {
    try {
        const id = req.params

        if (req.user.role !== 'seller' && req.user.role !== 'admin') {
            return errorRes(res, "only seller and admin can get product")
        }

        const product = await productService.findProduct(id)
        if (!product) {
            return errorRes(res, "Product Not Found!")
        }
        return successRes(res, "Get Single Product Successfully", product, 201)

    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }
}


const updateProduct = async (req, res) => {
    try {
        const productBody = req.body
        const { id } = req.params

        if (req.user.role !== 'seller' && req.user.role !== 'admin') {
            return errorRes(res, "only seller and admin can update the product")
        }

        const product = await productService.findProduct(req.params)
        if (!product) {
            return errorRes(res, "Product Not Found!")
        }

        const updatedata = await productService.updateProduct(productBody, { id: id })
        return successRes(res, "product Update Successfully!", updatedata, 200)
    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }
}


const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        if (req.user.role !== 'seller' && req.user.role !== 'admin') {
            return errorRes(res, "only seller and admin can delete product")
        }

        const product = await productService.findProduct({ id: id })
        if (!product) {
            return errorRes(res, "Product Not Found!")
        }

        const deletedProduct = await productService.deleteProduct({ id: id })
        return successRes(res, "Product Deleted Successfully", deletedProduct)
    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }
}

const filterProduct = async (req, res) => {
    try {
        const { id, name, description, price, quantity, categoty_id, subcategory_id, seller_id } = req.body

        if (req.user.role !== 'seller' && req.user.role !== 'admin') {
            return errorRes(res, "only seller and admin can filter the product")
        }

        const whereCondition = {};
        if (id) {
            whereCondition.id = id
        }

        if (name) {
            whereCondition.name = { [Op.iLike]: `%${name}%` }
        }

        if (description) {
            whereCondition.description = description
        }

        if (price) {
            whereCondition.price = { [Op.eq]: Number(price) }
        }

        if (quantity) {
            whereCondition.quantity = quantity
        }

        if (categoty_id) {
            whereCondition.categoty_id = categoty_id
        }

        if (subcategory_id) {
            whereCondition.subcategory_id = subcategory_id
        }

        if (seller_id) {
            whereCondition.seller_id = seller_id
        }

        const filterdata = await productService.filter(whereCondition)
        if (filterdata.length == 0) {
            return errorRes(res, "no data found")
        }
        return successRes(res, "Product Get Successfully", filterdata)

    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }
}

const getAllProduct=async(req,res)=>{
 try {
    
            if (req.user.role !== 'seller' && req.user.role !== 'admin') {
                return errorRes(res, "only seller and admin can get product details")
            }
            const allProduct = await productService.getAllProduct()
            return successRes(res, "Get All Product Successfully", allProduct, 200)
        }
        catch (error) {
            console.log("Something want wrong!", error)
            return catchRes(res, error.message, 500)
        }
    
    
}

module.exports = { createProduct, getSingleProduct, updateProduct, deleteProduct, filterProduct,getAllProduct}