import db from "../models"
import type { IProduct } from "../types/product.types";
const { Category, Subcategory, Product} = db;

const createProduct = async (productBody:IProduct) => {
    const product = await Product.create({ ...productBody })
    console.log(product)
    return product
}

const findProduct = async (whereQuery:any, attributes = null) => {
    const product = await Product.findOne({ where: whereQuery, attributes })
    return product
}

const updateProduct = async (productBody:IProduct, whereQuery:any) => {
    const product = await Product.update(productBody, { where: whereQuery })
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