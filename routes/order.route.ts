import express from "express"
let orderRoute = express.Router()

const { createOrder, getOrderById, getOrdersByUser, getUserWithOrders } = require("../controllers/order.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { authMiddleware } = require("../middlewares/auth.middleware")


orderRoute.post("/", authMiddleware, multipartyMiddleware, createOrder);
orderRoute.get("/:id", authMiddleware, multipartyMiddleware, getOrderById);
orderRoute.get("/", authMiddleware, multipartyMiddleware, getOrdersByUser);
orderRoute.post("/userOrders", authMiddleware, multipartyMiddleware, getUserWithOrders);



module.exports = orderRoute;
