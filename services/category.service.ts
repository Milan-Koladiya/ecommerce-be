import db from "../models"
const { User, Category, Subcategory, Product, Order } = db;

const createCategory = async(categoryBody:any) => {
    const category = Category.create(categoryBody)
    return category
}

const findCategory = async (whereQuery:any, attributes = null) => {
    const category = await Category.findOne({ where: whereQuery, attributes })
    return category
}

const getAllCategory = async () => {
    const category = await Category.findAll()
    return category
}

const updateCategory = async (categoryBody:any, whereQuery:any) => {
    const category = await Category.update(categoryBody, { where: whereQuery })
    const updatedCategory = await Category.findOne({ where: whereQuery});
    return updatedCategory
}

const deleteCategory = async (whereQuery:any) => {
    const category = await Category.destroy({ where: whereQuery, paranoid: true })
    return category
}
module.exports = { createCategory, findCategory, getAllCategory, updateCategory, deleteCategory }
