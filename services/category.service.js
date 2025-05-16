const { Category } = require("../models")

const createCategory = (categoryBody) => {
    const category = Category.create(categoryBody)
    return category
}


const findCategory = async (whereQuery, attributes = null) => {
    const category = await Category.findOne({ where: whereQuery, attributes, paranoid: true })
    return category
}

const getAllCategory = async () => {
    const category = await Category.findAll({ paranoid: true })
    return category
}


const updateCategory = async (categoryBody, whereQuery) => {
    const category = await Category.update(categoryBody, { where: whereQuery, paranoid: true })
    const updatedCategory = await Category.findOne({ where: whereQuery, paranoid: true });
    return updatedCategory

}


const deleteCategory = async (whereQuery) => {
    const category = await Category.destroy({ where: whereQuery, paranoid: true })
    return category

}
module.exports = { createCategory, findCategory, getAllCategory, updateCategory, deleteCategory }
