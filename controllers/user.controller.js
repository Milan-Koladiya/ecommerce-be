const userService = require("../services/user.service")

const getprofile = async (req, res) => {
    try {
        const { id } = req.body
        const user = await userService.findUser({ id: id })
        if (!user) {
            return res.status(200).json({
                error: false,
                message: "user not found"
            });
        }
        return res.status(200).json({
            error: false,
            message: "User profile get successfully",
            data: { user: user }
        });

    }
    catch (error) {
        console.log("Something want wrong!", error.message)
        return res.status(400).json({
            error: true,
            message: error.message,
            data: null

        });
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const userBody = req.body
        const { id } = req.body

        const user = await userService.findUser({ id: id })
        if (!user) {
            return res.status(200).json({
                error: false,
                message: "user not found"
            });
        }
        const updatedata = await userService.updateUser(userBody, { id: id })
        console.log(updatedata)
        return res.status(200).json({
            error: false,
            message: "User profile get successfully",
            data: { user: updatedata }
        });

    }
    catch (error) {
        console.log("Something want wrong!", error)
        return res.status(400).json({
            error: true,
            message: error.message,
            data: null

        });
    }

}
module.exports = { getprofile, updateUserProfile }