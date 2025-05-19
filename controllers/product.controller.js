const productService = require("../services/product.service")
const { successRes, catchRes, errorRes } = require("../utils/response.function")
const { Op } = require("sequelize");


const createProduct = async (req, res) => {
    try {
        const productBody = req.body
        const file = req.file
        console.log(req.file)
        const data = {
            ...productBody,
            image_url: file.filename
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
        const {id}= req.params

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
        const  {id} = req.params

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
        const { id, name, description,price, quantity, categoty_id, subcategory_id, seller_id } = req.body
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
            whereCondition.price ={[Op.eq]:Number(price)}
            console.log("Price from body:", price, "Type:", typeof price);

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
            return errorRes(res,"no data found")
        }
        return successRes(res, "Product Get Successfully", filterdata)

    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }
}
module.exports = { createProduct, getSingleProduct, updateProduct, deleteProduct, filterProduct }