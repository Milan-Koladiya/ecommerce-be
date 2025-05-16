const router = require("express").Router();

const { registerUser,loginUser } = require("../controllers/auth.controller");
const multipartyMiddleware = require("connect-multiparty")();

router.post("/register", multipartyMiddleware, registerUser);
router.post("/login", multipartyMiddleware, loginUser);


module.exports = router;
