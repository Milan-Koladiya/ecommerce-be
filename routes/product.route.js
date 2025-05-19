const router = require("express").Router();

const { createProduct, getSingleProduct, updateProduct, deleteProduct, filterProduct } = require("../controllers/product.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { upload } = require("../middlewares/multer.middleware")
const { varifytoken } = require("../middlewares/auth.middleware")


router.post("/", varifytoken, upload.single('file'), createProduct);
router.get("/:id", varifytoken, getSingleProduct);
router.put("/:id", varifytoken, upload.single('file'), updateProduct);
router.delete("/:id", varifytoken, multipartyMiddleware, deleteProduct);
router.post("/filter", varifytoken, multipartyMiddleware, filterProduct);

module.exports = router;
