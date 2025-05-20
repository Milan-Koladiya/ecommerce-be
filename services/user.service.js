const { User } = require("../models")


const findUser = async (whereQuery, attributes = null) => {
    const user = await User.findOne({ where: whereQuery, attributes, paranoid: true })//paranoid:true means deletedAt:null 
    return user
}

const updateUser = async (userBody, whereQuery) => {
    const user = await User.update(userBody, { where: whereQuery, paranoid: true })
    //  console.log("=====",user)//it return [1] or [0]
    const updatedUser = await User.findOne({ where: whereQuery,paranoid: true });
    return updatedUser

}

const deleteUser = async (whereQuery) => {
    const user = await User.destroy({ where: whereQuery, paranoid: false })
    return user
}

const validUser=async(userId)=>{
    
}

module.exports = { findUser, updateUser, deleteUser }