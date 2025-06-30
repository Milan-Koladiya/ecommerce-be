import express from "express"
let productRoute = express.Router()

const { createProduct, getSingleProduct, updateProduct, deleteProduct, filterProduct,getAllProduct } = require("../controllers/product.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { upload } = require("../middlewares/cloudinary.middleware");
const { authMiddleware } = require("../middlewares/auth.middleware")


productRoute.post("/", authMiddleware, upload.single('file'), createProduct);
productRoute.get("/:id", getSingleProduct);//remove token verify
productRoute.get("/", getAllProduct);//remove token verify
productRoute.put("/:id", authMiddleware, upload.single('file'), updateProduct);
productRoute.delete("/:id", authMiddleware, multipartyMiddleware, deleteProduct);
productRoute.post("/filter", multipartyMiddleware, filterProduct);//remove token verify

module.exports = productRoute;
    