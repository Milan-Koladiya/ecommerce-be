const productService = require("../services/product.service")
const { successRes, catchRes, errorRes } = require("../utils/response.function")



const createProduct = async (req, res) => {
    try {
        const productBody = req.body
        const file = req.file
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
        const id = req.params

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

const filterProduct = (req, res) => {
    try {
        const {id,name,description,price,quantity,categoty_id,subcategory_id,seller_id}=req.body
        console.log(req.file)
        
    return successRes(res, "Product Get Successfully", data)

    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }
}
module.exports = { createProduct, getSingleProduct, updateProduct, deleteProduct,filterProduct}