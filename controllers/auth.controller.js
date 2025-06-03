const authService = require("../services/auth.service");
const { successRes, catchRes, errorRes } = require("../utils/response.function");
const { verifyToken } = require("../utils/JWTtokenHandler");
const { sendVerificationEmail, sendResetPasswordEmail } = require("../utils/email.service")
const { createTokenPair } = require("../utils/JWTtokenHandler")

const registerUser = async (req, res) => {
    try {
        const userBody = req.body;

        const userExist = await authService.findUser({ email: userBody.email });
        if (userExist) {
            return errorRes(res, "Email already exists!");
        }

        const user = await authService.createUser(userBody);

        await sendVerificationEmail(user, req.headers.origin);

        return successRes(res, "User registered successfully. Please verify your email.", user, 201);
    } catch (error) {
        console.log("Something went wrong!", error);
        return catchRes(res, error.message, 500);
    }
};

const emailVerify = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return errorRes(res, 'Token is required', 400);

        try {
            const decoded = verifyToken(token);
            const { tokenExpiryTime, id } = decoded;

            const userVerified = await authService.findUser({ id });
            if (!userVerified) {
                return errorRes(res, 'User not found', 404);
            }

            if (userVerified.isVerified === true) {
                return successRes(res, 'User already verified your email');
            }

            const currentTime = Date.now();
            if (currentTime > tokenExpiryTime) {
                return errorRes(res, 'Your link is expired!', 400);
            }

            await authService.updateVerified({ id });
            return successRes(res, 'Email verified successfully');

        } catch (err) {
            console.log('err :>> ', err);
            return errorRes(res, 'Invalid or expired token', 400);
        }

    } catch (error) {
        console.log("Verification error:", error);
        return catchRes(res, error.message, 500);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await authService.findUser({ email });
        if (!userExist) {
            return errorRes(res, "Account does not exist! Please register first...");
        }

        const data = await authService.findUser({ email, password });
        if (!data) {
            return errorRes(res, "Please enter valid email or password!");
        }

        if (!data.dataValues.isVerified) {
            console.log('not verified')
            await sendVerificationEmail(data, req.headers.origin);
            return errorRes(res, "Your account is not verified yet, we've sent email to verify your account.");
        }

        const userData = { ...data.dataValues };
        delete userData.password;

        const token = await createTokenPair(userData);
        const responseData = {
            ...userData,
            token
        };

        return successRes(res, "User Login Successfully", responseData, 200);
    } catch (error) {
        console.log("Something went wrong!", error);
        return catchRes(res, error.message, 500);
    }
};

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await authService.findUser({ email });
        if (!user) {
            return errorRes(res, "Your account is not verified yet, we've sent email to verify your account", 404);
        }

        const now = Date.now();
        const tokenExpiryTime = now + 15 * 60 * 1000;
        const resetToken = createTokenPair({ id: user.id, email: user.email, tokenExpiryTime });
        const resetUrl = `${req.headers.origin}/auth/reset-password?token=${resetToken}`;
        await sendResetPasswordEmail(user.email, user.first_name, user.last_name, resetUrl);

        return successRes(res, "Password reset link sent to your email");
    } catch (error) {
        console.error("Forget password error:", error);
        return catchRes(res, error.message, 500);
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) {
            return errorRes(res, "Token and new password are required", 400);
        }

        const decoded = verifyToken(token);
        const { tokenExpiryTime, id } = decoded;

        const currentTime = Date.now();
        if (currentTime > tokenExpiryTime) {
            return errorRes(res, "Reset link has expired", 400);
        }

        const user = await authService.findUser({ id });
        if (!user) {
            return errorRes(res, "User not found", 404);
        }

        await authService.updatePassword({ id }, newPassword);

        return successRes(res, "Password reset successfully");
    } catch (error) {
        console.error("Reset password error:", error);
        return errorRes(res, "Invalid or expired token", 400);
    }
};

module.exports = { registerUser, loginUser, emailVerify, forgetPassword, resetPassword };
