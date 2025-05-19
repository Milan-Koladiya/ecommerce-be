const router = require("express").Router();

const { addToCart, getCurrentUserCart, updateQuantity, removeProductFromCart, clearCartOfUser } = require("../controllers/cart.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { varifytoken } = require("../middlewares/auth.middleware")


router.post("/", varifytoken, multipartyMiddleware, addToCart);
router.get("/me", varifytoken, multipartyMiddleware, getCurrentUserCart);
router.put("/:product_id", varifytoken, multipartyMiddleware, updateQuantity);
router.delete("/:product_id", varifytoken, multipartyMiddleware, removeProductFromCart);
router.delete("/", varifytoken, multipartyMiddleware, clearCartOfUser);

module.exports = router;
