import db from "../models"
const { User } = db;

const createUser = async (userBody: any) => {
    const userExist = await isValidUser({ email: userBody.email })
    const user = await User.create({ ...userBody })
    return user
}

const isValidUser = async (whereQuery: any, attributes = null) => {
    const user = await User.findOne({ where: whereQuery, attributes });
    return user
};

const findUser = async (whereQuery: any, attributes = null) => {
    const user = await User.findOne({ where: whereQuery, attributes })
    return user
}

const updatePassword = async ({ id }: { id: any }, newPassword: any) => {
    return await User.update({ password: newPassword }, { where: { id } });
};

const updateVerified = async (whereClause: any) => {
    const user = await User.update(
        { isVerified: true },
        { where: whereClause }
    );
    return user;
}



module.exports = { createUser, findUser, updateVerified, updatePassword }