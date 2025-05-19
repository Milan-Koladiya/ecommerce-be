const router = require("express").Router();
const { createOrder ,getOrderById} = require("../controllers/order.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { varifytoken } = require("../middlewares/auth.middleware")


router.post("/", varifytoken, multipartyMiddleware, createOrder);
router.get("/:id", varifytoken, multipartyMiddleware, getOrderById);



module.exports = router;
