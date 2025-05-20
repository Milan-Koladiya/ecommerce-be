const router = require("express").Router();

const { addToCart, getCurrentUserCart, updateQuantity, removeProductFromCart, clearCartOfUser } = require("../controllers/cart.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { authMiddleware } = require("../middlewares/auth.middleware")


router.post("/", authMiddleware, multipartyMiddleware, addToCart);
router.get("/me", authMiddleware, multipartyMiddleware, getCurrentUserCart);
router.put("/:product_id", authMiddleware, multipartyMiddleware, updateQuantity);
router.delete("/:product_id", authMiddleware, multipartyMiddleware, removeProductFromCart);
router.delete("/", authMiddleware, multipartyMiddleware, clearCartOfUser);

module.exports = router;
