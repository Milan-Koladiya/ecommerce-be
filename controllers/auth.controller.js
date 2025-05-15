const authService = require("../services/auth.service")

const register_user = async (req, res) => {
    try {
        const userBody = req.body
        console.log(userBody)
        const user = await authService.createUser(userBody);
        console.log(user)
        return res.status(200).json({
            error: false,
            message: "User Register Successfully!",
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

const login_user = async (req, res) => {
    try {
        const { email, password } = req.body
        const data = await authService.findUser({ email: email, password: password })

        if (!data) {
            return res.status(500).send({ msg: "Please enter valid email or password!" })
        }
        return res.status(500).send({ msg: "User login successfully", data: data })
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

module.exports = { register_user, login_user }