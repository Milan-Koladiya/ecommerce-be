const { Subcategory, Product,Category } = require("../models")


const createProduct = async (productBody) => {
    const product = await Product.create({ ...productBody })
    return product
}

const findProduct = async (whereQuery, attributes = null) => {
    const product = await Product.findOne({ where: whereQuery, attributes })
    return product
}

const updateProduct = async (userBody, whereQuery) => {
    const product = await Product.update(userBody, { where: whereQuery })
    const updatedProduct = await Product.findOne({ where: whereQuery });
    return updatedProduct
}

const deleteProduct = async (whereQuery) => {
    const product = await Product.destroy({ where: whereQuery })
    return product
}


const filter = async (whereQuery) => {
    const product = await Product.findAll({ where: whereQuery })
    return product
}

const getAllProduct = async () => {
    const product = await Product.findAll({
        attributes: ['id', 'name', 'price', 'quantity', 'description'],
        include: {
            model: Subcategory,
            as: 'subcategory',
            attributes: ['id', 'name'],
            include:[{
                model:Category,
                as:'category',
                attributes:['id','name']
            }]
        }
    })
    return product
}

module.exports = { createProduct, findProduct, updateProduct, deleteProduct, filter, getAllProduct }