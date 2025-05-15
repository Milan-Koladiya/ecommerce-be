const { User } = require("../models")


const findUser = async (whereQuery, attributes = null) => {
    const user = await User.findOne({ where: whereQuery, attributes })
    if (!user) throw new Error("user not found")
    return user.toJSON();
}

const updateUser = async (userBody, whereQuery) => {
    const user = await User.update(userBody, { where: whereQuery })
    const updatedUser = await User.findOne({ where: whereQuery });

    return updatedUser.toJSON();

}

module.exports = { findUser, updateUser }