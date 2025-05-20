const authService = require("../services/auth.service")
const { successRes, catchRes, errorRes } = require("../utils/response.function")
const { createTokenPair } = require("../utils/JWTtokenHandler")


const registerUser = async (req, res) => {
    try {
        const userBody = req.body
        const user = await authService.createUser(userBody);
        return successRes(res, "User Register Successfully!", user, 201)
    }
    catch (error) {
        console.log("Something want wrong!", error.message)
        return catchRes(res, error.message, 500)
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const data = await authService.findUser({ email: email, password: password })

        const userExist = await authService.findUser({ email: email })
        if (!userExist) {
            return errorRes(res, "Account Not exist! Please Register first...")
        }
        if (!data) {
            return errorRes(res, "Please enter valid email or password!")
        }
    
        const userData = { ...data.dataValues }
        delete userData.password;
        const token = await createTokenPair(userData);

        const responseData={
            ...userData,
            token
        }

        return successRes(res, "User Login Successfully", responseData, 200)
    }
    catch (error) {
        console.log("Something want wrong!", error)
        return catchRes(res, error.message, 500)
    }
}

module.exports = { registerUser, loginUser }