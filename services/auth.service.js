const { User } = require("../models")

const createUser = async (userBody) => {
    const userExist = await isValidUser({ email: userBody.email })
    if (userExist) throw new Error("Email already exist!")
    const user = await User.create({ ...userBody })
    console.log(user)
    return user
}


const isValidUser = async (whereQuery, attributes = null) => {
    const user = await User.findOne({ where: whereQuery, attributes });
    return user
};


const findUser = async (whereQuery, attributes = null) => {
    const user = await User.findOne({ where: whereQuery, attributes })
    return user
}

module.exports = { createUser, findUser }