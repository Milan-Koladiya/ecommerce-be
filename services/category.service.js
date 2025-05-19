const { Category } = require("../models")

const createCategory = async(categoryBody) => {
    const category = Category.create(categoryBody)
    return category
}

const findCategory = async (whereQuery, attributes = null) => {
    const category = await Category.findOne({ where: whereQuery, attributes })
    return category
}

const getAllCategory = async () => {
    const category = await Category.findAll()
    return category
}

const updateCategory = async (categoryBody, whereQuery) => {
    const category = await Category.update(categoryBody, { where: whereQuery })
    const updatedCategory = await Category.findOne({ where: whereQuery});
    return updatedCategory
}

const deleteCategory = async (whereQuery) => {
    const category = await Category.destroy({ where: whereQuery, paranoid: true })
    return category
}
module.exports = { createCategory, findCategory, getAllCategory, updateCategory, deleteCategory }
