const router = require("express").Router();

const { createProduct, getSingleProduct, updateProduct, deleteProduct, filterProduct,getAllProduct } = require("../controllers/product.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { upload } = require("../middlewares/cloudinary.middleware");
const { authMiddleware } = require("../middlewares/auth.middleware")


router.post("/", authMiddleware, upload.single('file'), createProduct);
router.get("/:id", getSingleProduct);//remove token verify
router.get("/", getAllProduct);//remove token verify
router.put("/:id", authMiddleware, upload.single('file'), updateProduct);
router.delete("/:id", authMiddleware, multipartyMiddleware, deleteProduct);
router.post("/filter", multipartyMiddleware, filterProduct);//remove token verify

module.exports = router;
    