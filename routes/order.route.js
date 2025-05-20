const router = require("express").Router();
const { createOrder ,getOrderById,getOrdersByUser} = require("../controllers/order.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { authMiddleware } = require("../middlewares/auth.middleware")


router.post("/", authMiddleware, multipartyMiddleware, createOrder);
router.get("/:id", authMiddleware, multipartyMiddleware, getOrderById);
router.get("/", authMiddleware, multipartyMiddleware, getOrdersByUser);



module.exports = router;
