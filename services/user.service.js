const { User, Order } = require("../models")


const findUser = async (whereQuery, attributes = null) => {
    const user = await User.findOne({ where: whereQuery, attributes })//paranoid:true means deletedAt:null 
    return user
}

const updateUser = async (userBody, whereQuery) => {
    const user = await User.update(userBody, { where: whereQuery, paranoid: true })
    //  console.log("=====",user)//it return [1] or [0]
    const updatedUser = await User.findOne({ where: whereQuery, paranoid: true });
    return updatedUser

}

const deleteUser = async (whereQuery) => {
    const user = await User.destroy({ where: whereQuery, paranoid: false })
    return user
}

const getallBuyer = async () => {
    const user = await User.find({ whereQuery: { role: 'buyer' } })
    return user
}

const getUserWithOrders = async () => {
    const userOrders = await User.findAll({
        attributes: ['id', 'first_name', 'last_name', 'email'],
        include: [{
            model: Order,
            as:'order',
            attributes:['id','total_amount','payment_reference','createdAt']
        }]
    })
    return userOrders
}

module.exports = { findUser, updateUser, deleteUser,getUserWithOrders}