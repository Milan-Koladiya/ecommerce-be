const userService = require("../services/user.service")
const { successRes, catchRes, errorRes } = require("../utils/response.function")

const getprofile = async (req, res) => {
    try {
        const  id  = req.user.id
        const user = await userService.findUser({ id: id })

        if (!user) {
            return errorRes(res, "User not found")
        }
        return successRes(res, "User profile get successfully", user, 200)

    }
    catch (error) {
        console.log("Something want wrong!", error.message)
        return catchRes(res, error.message, 500)

    }
}

const updateUserProfile = async (req, res) => {
    try {
        const userBody = req.body
        const id = req.user.id

        const user = await userService.findUser({ id: id })

        if (!user) {
            return errorRes(res, "User not found")
        }

        const updatedata = await userService.updateUser(userBody, { id: id })

        return successRes(res, "User Profile Update Successfully!", updatedata, 200)
    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }
}


const deleteUser = async (req, res) => {
    try {
        const id  = req.user.id
        const user = await userService.findUser({ id: id })

        if (!user) {
            return errorRes(res, "User not found")
        }

        const deletedUser=await userService.deleteUser({id:id})
        return successRes(res, "User deleted successfully",deletedUser)
    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }
}
module.exports = { getprofile, updateUserProfile ,deleteUser}