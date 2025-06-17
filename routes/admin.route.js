const router = require("express").Router();

const { getBuyer, getSeller,getDashboardSummery } = require("../controllers/admin.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { authMiddleware } = require("../middlewares/auth.middleware")


router.get("/get_buyer", authMiddleware, getBuyer);
router.get("/get_seller", authMiddleware, getSeller);
router.get("/dashboard", authMiddleware, getDashboardSummery);

module.exports = router;
