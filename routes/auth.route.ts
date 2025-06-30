import express from "express"
let authRoute = express.Router()

const { registerUser, loginUser, emailVerify, forgetPassword, resetPassword } = require("../controllers/auth.controller");
const multipartyMiddleware = require("connect-multiparty")();

authRoute.post("/register", multipartyMiddleware, registerUser);
authRoute.post("/login", multipartyMiddleware, loginUser);
authRoute.post("/emailverify", emailVerify);
authRoute.post('/forget-password', forgetPassword);
authRoute.post('/reset-password', resetPassword);


module.exports=authRoute
