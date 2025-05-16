const { Subcategory } = require("../models")

const createSubcategory = (subcategoryBody) => {
    const subcategory = Subcategory.create(subcategoryBody)
    return subcategory
}


const findSubcategory = async (whereQuery, attributes = null) => {
    const subcategory = await Subcategory.findOne({ where: whereQuery, attributes })
    return subcategory
}

const getAllSubcategory = async (whereQuery, attributes = null) => {
    const subcategory = await Subcategory.findAll({ where: whereQuery, attributes })
    return subcategory
}


const updateSubcategory = async (subcategoryBody, whereQuery) => {
    const subcategory = await Subcategory.update(subcategoryBody, { where: whereQuery })
    const updatedSubcategory = await Subcategory.findOne({ where: whereQuery });
    return updatedSubcategory

}

const deleteSubcategory = async (whereQuery) => {
    const subcategory = await Subcategory.destroy({ where: whereQuery })
    return subcategory

}
module.exports = { createSubcategory, findSubcategory, getAllSubcategory, updateSubcategory, deleteSubcategory }
