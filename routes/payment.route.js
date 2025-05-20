const router = require("express").Router();

const { createPayment,getStatus } = require("../controllers/payment.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { authMiddleware } = require("../middlewares/auth.middleware")


router.post("/",authMiddleware, multipartyMiddleware, createPayment);
router.get("/:order_id",authMiddleware, multipartyMiddleware, getStatus);



module.exports = router;
