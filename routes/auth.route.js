const router = require("express").Router();

const { register_user,login_user } = require("../controllers/auth.controller");
const multipartyMiddleware = require("connect-multiparty")();

router.post("/register", multipartyMiddleware, register_user);
router.post("/login", multipartyMiddleware, login_user);


module.exports = router;
