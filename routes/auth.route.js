const router = require("express").Router();

const { registerUser, loginUser, emailVerify, forgetPassword, resetPassword } = require("../controllers/auth.controller");
const multipartyMiddleware = require("connect-multiparty")();

router.post("/register", multipartyMiddleware, registerUser);
router.post("/login", multipartyMiddleware, loginUser);
router.post("/emailverify", emailVerify);
router.post('/forget-password', forgetPassword);
router.post('/reset-password', resetPassword);


module.exports = router;
