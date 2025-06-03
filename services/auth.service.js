const { User } = require("../models")
const { jwt } = require("jsonwebtoken")

const createUser = async (userBody) => {
    const userExist = await isValidUser({ email: userBody.email })
    const user = await User.create({ ...userBody })
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

const updatePassword = async ({ id }, newPassword) => {
    return await User.update({ password: newPassword }, { where: { id } });
};

const updateVerified = async (whereClause) => {
    const user = await User.update(
        { isVerified: true },
        { where: whereClause }
    );
    return user;
}



module.exports = { createUser, findUser, updateVerified,updatePassword}