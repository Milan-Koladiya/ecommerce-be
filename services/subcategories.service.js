const { Subcategory,Category } = require("../models")

const createSubcategory = (subcategoryBody) => {
    const subcategory = Subcategory.create(subcategoryBody)
    return subcategory
}


const findSubcategory = async (whereQuery, attributes = null) => {
    const subcategory = await Subcategory.findOne({ where: whereQuery, attributes })
    return subcategory
}

const getAllSubcategoryCategoryWise = async (whereQuery, attributes = null) => {
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

const getAllSubcategory=async()=>{
    const subcategories=await Subcategory.findAll({
        attributes:['id','name','seller_id','category_id'],
        include:[{
            model:Category,
            as:'category',
            attributes:['id','name']
        }]
    })
    
    return subcategories

}
module.exports = { createSubcategory, findSubcategory,getAllSubcategoryCategoryWise, getAllSubcategory, updateSubcategory, deleteSubcategory }
