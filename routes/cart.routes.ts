import express from "express"
let cartRoute = express.Router()

const { addToCart, getCurrentUserCart, updateQuantity, removeProductFromCart, clearCartOfUser } = require("../controllers/cart.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { authMiddleware } = require("../middlewares/auth.middleware")


cartRoute.post("/", authMiddleware, multipartyMiddleware, addToCart);
cartRoute.get("/me", authMiddleware, multipartyMiddleware, getCurrentUserCart);
cartRoute.put("/:product_id", authMiddleware, multipartyMiddleware, updateQuantity);
cartRoute.delete("/:product_id", authMiddleware, multipartyMiddleware, removeProductFromCart);
cartRoute.delete("/", authMiddleware, multipartyMiddleware, clearCartOfUser);

module.exports = cartRoute;
