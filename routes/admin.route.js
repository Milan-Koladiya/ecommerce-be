const router = require("express").Router();

const { getBuyer, getSeller } = require("../controllers/admin.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { authMiddleware } = require("../middlewares/auth.middleware")


router.get("/get_buyer", authMiddleware, getBuyer);
router.get("/get_seller", authMiddleware, getSeller);

module.exports = router;
