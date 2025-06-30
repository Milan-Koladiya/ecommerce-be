import db from "../models"
const { User, Category, Subcategory, Product, Order,Order_items,Cart} = db;

const createProduct = async (productBody:any) => {
    const product = await Product.create({ ...productBody })
    console.log(product)
    return product
}

const findProduct = async (whereQuery:any, attributes = null) => {
    const product = await Product.findOne({ where: whereQuery, attributes })
    return product
}

const updateProduct = async (userBody:any, whereQuery:any) => {
    const product = await Product.update(userBody, { where: whereQuery })
    const updatedProduct = await Product.findOne({ where: whereQuery });
    return updatedProduct
}

const deleteProduct = async (whereQuery:any) => {
    const product = await Product.destroy({ where: whereQuery })
    return product
}


const filter = async (whereQuery:any) => {
    const product = await Product.findAll({ where: whereQuery ,
        attributes: ['id', 'name', 'price', 'quantity', 'description','image_url'],
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

const getAllProduct = async () => {
    const product= await Product.findAll({
        attributes: ['id', 'name', 'price', 'quantity', 'description','image_url'],
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