import express from "express"
let paymentRoute = express.Router()

const { createPayment,getStatus } = require("../controllers/payment.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { authMiddleware } = require("../middlewares/auth.middleware")


paymentRoute.post("/",authMiddleware, multipartyMiddleware, createPayment);
paymentRoute.get("/:order_id",authMiddleware, multipartyMiddleware, getStatus);



module.exports = paymentRoute;
